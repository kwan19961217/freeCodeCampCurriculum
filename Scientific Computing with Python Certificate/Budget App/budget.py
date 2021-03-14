class Category():

	def __init__(self, cat):
		self.category = cat
		self.ledger = []
		self.balance = 0
		self.spending = 0

	def __str__(self):
		title = self.category.center(30, "*")
		balancesheet = title
		for item in self.ledger:
			if len(item['description']) > 23:
				balancesheet += "\n" + item['description'][0:23] + " " + "{:.2f}".format(item['amount'])
			else:
				space_length = 30 - len(item['description']) - len("{:.2f}".format(item['amount']))
				balancesheet += "\n" + item['description'] + " " * space_length + "{:.2f}".format(item['amount'])
		balancesheet += "\nTotal: " "{:.2f}".format(self.balance)
		return balancesheet
		
	def deposit(self, amount, description = ""):
		self.ledger.append({"amount": amount, "description": description})
		self.balance += amount

	def withdraw(self, amount, description = ""):
		if self.check_funds(amount):
			self.ledger.append({"amount": amount * -1, "description": description})
			self.balance -= amount
			self.spending += amount
			return True
		else:	
			return False

	def check_funds(self, amount):
		if self.balance >= amount:
			return True
		else:
			return False

	def transfer(self, amount, cat):
		if self.check_funds(amount):
			self.ledger.append({"amount": amount * -1, "description": "Transfer to " + cat.category})
			self.balance -= amount
			cat.ledger.append({"amount": amount, "description": "Transfer from " + self.category})
			cat.balance += amount
			return True
		else:
			return False

	def get_balance(self):
		return self.balance

def create_spend_chart(list):
	total_spending = 0
	percentage_spending = []
	number = [100,90,80,70,60,50,40,30,20,10,0]
	number_text = ["100"," 90"," 80"," 70"," 60"," 50"," 40"," 30"," 20"," 10","  0"]
	for i in list:
		total_spending += i.spending
	for i in list:
		percentage = int(i.spending / total_spending * 10) * 10
		percentage_spending.append(percentage)
	cat_list = []
	for cat in list:
		cat_list.append(cat.category)
	barchart = "Percentage spent by category"
	for i in range(11):
		barchart += "\n" + number_text[i] + "|"
		for cat_index in range(len(list)):
			if percentage_spending[cat_index] >= number[i]:
				barchart += " o "
			else:
				barchart += "   "

		barchart += " "

	barchart += "\n    " + "---" * len(list) + "-\n" 
	for letter_index in range(len(max(cat_list, key=len))):
		barchart += "    "
		for cat_index in range(len(list)):
			if letter_index < len(cat_list[cat_index]):
				barchart += " {letter} ".format(letter=cat_list[cat_index][letter_index])
			else:
				barchart += "   "
		barchart += " \n"
	barchart = barchart[:-1]
	return barchart

