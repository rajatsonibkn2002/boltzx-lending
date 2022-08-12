import smartpy as sp

class Lending(sp.Contract):
    def __init__(self):
        self.init(
            lenders = sp.map(l={}, tkey=sp.TAddress, tvalue = sp.TMutez),
            exchange_rate = sp.nat(20)
        )
    
    @sp.entry_point
    def lend_money(self):
        sp.if self.data.lenders.contains(sp.sender):
            self.data.lenders[sp.sender] += sp.amount
        sp.else:
            self.data.lenders[sp.sender] = sp.amount

    @sp.entry_point
    def withdraw_money(self):
        sp.if self.data.lenders.contains(sp.sender):
            sp.verify(self.data.lenders[sp.sender]>sp.mutez(0), "Please lend some money before withdrawal!")
            amount = sp.split_tokens(self.data.lenders[sp.sender], 1, self.data.exchange_rate)
            sp.verify(sp.balance >= self.data.lenders[sp.sender] + amount, "Not Enough Balance!")
            sp.send(sp.sender, self.data.lenders[sp.sender] + amount)
            self.data.lenders[sp.sender] = sp.mutez(0)
        sp.else:
            sp.failwith("Not Lended Yet!")

    @sp.entry_point
    def default(self):
        sp.failwith("NOT ALLOWED")

@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()

    # Test accounts
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    argent = sp.test_account("argent")

    # Contract instance
    lending = Lending()
    scenario += lending

    # lending_money
    scenario.h2("lend_money (valid test)")
    scenario += lending.lend_money().run(amount = sp.tez(5), sender = alice)
    scenario += lending.lend_money().run(amount = sp.tez(5), sender = alice)
    scenario += lending.lend_money().run(amount = sp.tez(5), sender = bob)

    #withdraw_money
    scenario.h2("withdraw_money (valid test)")
    scenario += lending.withdraw_money().run(sender=alice)
    scenario += lending.withdraw_money().run(sender=argent, valid=False)
    scenario += lending.withdraw_money().run(sender=alice, valid=False)