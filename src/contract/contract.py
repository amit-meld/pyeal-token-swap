from pyteal import *

def approval_program():
  
  on_create = Seq([
    App.globalPut(Bytes("contract_creator"), Txn.sender()),
    Return(Int(1))
  ])
  
  def create_token():
    return Seq([
      InnerTxnBuilder.Begin(),
      InnerTxnBuilder.SetFields({
      TxnField.type_enum: TxnType.AssetConfig,
      TxnField.config_asset_total: Int(1000000),
      TxnField.config_asset_decimals: Int(3),
      TxnField.config_asset_unit_name: Bytes("oz"),
      TxnField.config_asset_name: Bytes("Gold"),
      TxnField.config_asset_url: Bytes("https://gold.rush"),
      TxnField.config_asset_manager: Global.current_application_address(),
      TxnField.config_asset_reserve: Global.current_application_address(),
      TxnField.config_asset_freeze: Global.current_application_address(),
      TxnField.config_asset_clawback: Global.current_application_address()
      }),
      InnerTxnBuilder.Submit(),
    ])
    
    
  def asset_optin():
    return Seq([      
      InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum : TxnType.AssetTransfer,
            TxnField.xfer_asset : Txn.assets[0],
            TxnField.asset_amount : Int(0),
            #TxnField.sender : Global.current_application_address(),
            TxnField.asset_receiver: Global.current_application_address(),
            TxnField.fee : Int(0)
            }),
      InnerTxnBuilder.Submit(),      
      asa_deposit(),
      
      ])
    
  def deposit():
    return Seq([
        Assert(Global.group_size() == Int(1)),
        Assert(Txn.application_args.length() == Int(2)), 
        
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
          TxnField.type_enum: TxnType.Payment,
          TxnField.sender : Txn.sender(),
          TxnField.receiver:  Global.current_application_address(),
          TxnField.amount: Btoi(Txn.application_args[1]),
          TxnField.fee : Int(0),
          TxnField.rekey_to: Txn.sender()
        }),
        InnerTxnBuilder.Submit(),
        Approve()
      ])
   
  call = Cond(
          [Txn.application_args[0] == Bytes("deposit"), deposit()]
        )
  
  def swap_token():
    return Seq([
      
    ])
  
  program = Cond(
        [Txn.application_id() == Int(0), Approve()],
        [Txn.on_completion() == OnComplete.NoOp, call],
        [
            Or(
            Txn.on_completion() == OnComplete.OptIn,
            Txn.on_completion() == OnComplete.CloseOut,
            Txn.on_completion() == OnComplete.UpdateApplication,
            Txn.on_completion() == OnComplete.DeleteApplication,
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
    
  
