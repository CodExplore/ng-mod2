(function () {
		'use strict';


		angular.module('ShoppingListCheckOff', [])
			.controller('ToBuyController', ToBuyController)
			.controller('AlreadyBoughtController', AlreadyBoughtController)
			.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

		ToBuyController.$inject = ['ShoppingListCheckOffService'];

		function ToBuyController(ShoppingListCheckOffService) {

			var Buy = this;
			Buy.errorMessage = "";
			Buy.showItems = ShoppingListCheckOffService.showToBuyItems();
			Buy.listUpdate = function (indexID) {
				ShoppingListCheckOffService.addItem(Buy.showItems[indexID].name, Buy.showItems[indexID].quantity);
				ShoppingListCheckOffService.removeItem(indexID);
				if (Buy.showItems.length === 0) {
					Buy.errorMessage = "Everything is bought!";
				}
			};

		}

		AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

		function AlreadyBoughtController(ShoppingListCheckOffService) {
			var BoughtList = this;

			BoughtList.showItems = ShoppingListCheckOffService.getBoughtItems();
			BoughtList.errUpdate = function () {
				if (BoughtList.showItems.length === 0) {
					BoughtList.Message = "Nothing bought yet.";
					return BoughtList.Message;
				} else {
					BoughtList.Message = "";
					return BoughtList.Message;
				}
			};
		}


		function ShoppingListCheckOffService() {
			var service = this;
			var toBuy = [{
				name: "Cake",
				quantity: 14
		}, {
				name: "Cream",
				quantity: 4
		}, {
				name: "Coke",
				quantity: 10
		}, {
				name: "Butter",
				quantity: 4
		}, {
				name: "Milk",
				quantity: 45
		}];

			var boughtItem = [];

			service.addItem = function (itemName, quantity) {
				var item = {
					name: itemName,
					quantity: quantity
				}
				boughtItem.push(item);
			};

			service.showToBuyItems = function () {
				return toBuy;
			};

			service.getBoughtItems = function () {
				return boughtItem;
			};

			service.removeItem = function (indexID) {
				toBuy.splice(indexID, 1);
			};
		}
	}

)();
