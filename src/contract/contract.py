from pyteal import *

def approval_program():

  creator = Txn.sender() == App.globalGet(Bytes("Creator"))
  amount = Gtxn[0].asset_amount()
  withdraw_amount = Btoi(Txn.application_args[1])

  wNGN_Bal = AssetHolding.balance(Global.current_application_address(), Txn.assets[0] ) #id of wNGN
  wGHC_Bal = AssetHolding.balance(Global.current_application_address(),  Txn.assets[1]) #id of wGHC

  # Oncreate of the app the creator, wNGN and wGHC will be on the global state
  on_create = Seq([
    App.globalPut(Bytes("Creator"), Txn.sender()),
    App.globalPut(Bytes("wNGN"), Txn.assets[0]),
    App.globalPut(Bytes("wGHC"), Txn.assets[1]),
    Return(Int(1))
  ])

  # Asset Transfer
  def transfer_asset(assetIndex, amount, receiver):
    return Seq([
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.AssetTransfer,
            TxnField.asset_receiver: receiver,
            TxnField.asset_amount: amount,
            TxnField.xfer_asset: Txn.assets[assetIndex], #ON CALL asset index 0 = wNGN and 1 = wGHC
        }),
        InnerTxnBuilder.Submit(),
    ])

  swappable_assets = And(
    Txn.assets[0] == App.globalGet(Bytes("wNGN")),
    Txn.assets[1] == App.globalGet(Bytes("wGHC")),
  )

  contract_asset_optin = Seq([
    Assert(creator),
    Assert(swappable_assets),
    #contract opting into wNGN ASA
    transfer_asset(0,Int(0), Global.current_application_address()),
    #contract opting into wGHC ASA
    transfer_asset(1,Int(0), Global.current_application_address()),
    Approve()
  ])

# Ensure it's a valid transaction
  valid_transaction = And(
    Global.group_size() == Int(2),
    Gtxn[0].type_enum() == TxnType.AssetTransfer,
    Gtxn[0].asset_receiver() == Global.current_application_address(),
    Gtxn[0].close_remainder_to() == Global.zero_address(),
    Txn.assets.length() == Int(1),
    Gtxn[0].rekey_to() == Global.zero_address(),
  )

  def token_swap(assetArg):
    return Seq([
      Assert(valid_transaction),
      Assert(Gtxn[1].assets[0] == App.globalGet(Bytes(assetArg))),
      InnerTxnBuilder.Begin(), 
      InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.AssetTransfer,
            TxnField.asset_receiver: Txn.sender(),
            TxnField.asset_amount: amount,
            TxnField.xfer_asset: Gtxn[1].assets[0],
        }),
        InnerTxnBuilder.Submit(),
        Approve()
    ])
    
  assets_withdrawal = Seq([
    Assert(creator), #Ensures only creator can make this call
    Assert(swappable_assets),
    #contract withdraw wNGN ASA
    transfer_asset(0,withdraw_amount, Txn.sender()),
    #contract withdraw wGHC ASA
    transfer_asset(1,withdraw_amount, Txn.sender()),
    Approve(),
  ]) 

  
  delete_app = Seq([
      wNGN_Bal,wGHC_Bal,
      Assert(creator),
      Assert(Txn.assets[0] == App.globalGet(Bytes("wNGN"))),
      Assert(Txn.assets[1] == App.globalGet(Bytes("wGHC"))),
      Assert(wNGN_Bal.value() == Int(0)),
      Assert(wGHC_Bal.value() == Int(0)),
      Approve(),
  ])
   
  on_call = Cond(
          [Txn.application_args[0] == Bytes("contract_optin"), contract_asset_optin],
          [Txn.application_args[0] == Bytes("wNGN"), token_swap("wGHC")],
          [Txn.application_args[0] == Bytes("wGHC"), token_swap("wNGN")],
          [Txn.application_args[0] == Bytes("withdraw"), assets_withdrawal]
        )
  
  
  program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, on_call],
        [Txn.on_completion() == OnComplete.UpdateApplication, Return(creator)],
        [Txn.on_completion() == OnComplete.DeleteApplication, delete_app],
        [
            Or(
            Txn.on_completion() == OnComplete.OptIn,
            Txn.on_completion() == OnComplete.CloseOut,
            ),
            Reject(),
        ],
    )

  return program

def clear_state_program(): 
    return Int(1)

with open("approval.teal", "w") as f:
    compiled = compileTeal(approval_program(), mode=Mode.Application, version=6)
    f.write(compiled)

with open("clear_state.teal", "w") as f:
    compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=6)
    f.write(compiled)
    
  
