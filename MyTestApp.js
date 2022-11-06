class Guest{
    constructor(name, status){
        this.name = name;
        this.status = status;
    }

    describe(){
        return `${this.name} is ${this.status}.`;
    }
}
 
class House {
    costructor(name){
        this.name = name;
        this.guests = [];
    }

    addGuest(guest){
        if (guest instanceof Guest){
                this.guests.push(guest);
        } else {
          throw new Error(`You can only add the instance of the guest. Argument is not a guest: ${guest}`); 
        }
    }

    describe(){
        return `${this.name} has ${this.guests.length} guests.`;
    }       
}

class Menu {
    constructor(){
        this.houses = [];
        this.selectedHouse = null;
    }
    
    start(){
        let selection =this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection){
            case '1':
                this.createHouse();
                break;
            case '2':    
                this.viewHouse();
                break;
            case '3':    
                this.deleteHouse();
                break;   
            case '4':    
                this.desplayHouse();
                break;     
            default:
                selection = 0;
            }
            selection = this.showMainMenuOptions();  
        } 
        alert('You are expelled!');  
    }

    showMainMenuOptions() {
        return prompt(`
        0 - exit
        1 - create new house
        2 - view houses
        3 - delete House
        4 - display houses
        `);
    }

    showHouseMenuOptions(houseInfo) {
        return prompt(`
        0 - back
        1 - create new guest
        2 - delete a player
        ------------------------
        ${houseInfo}
    `);
    }

   displayHouse() {
    let houseString = ' ';
    for (let i = 0; i < this.houses.length; i++){
        houseString += i + '- ' + this.houses[i].name + '\n';
    }
    alert(houseString);
   } 

   createHouse(){
    let name = prompt('Enter the name for new house:');
    this.houses.push(new House(name));
   }

   viewHouse(){
        let index = prompt('Enter the index of the house you wish to view:');
        if(index > -1 && index < this.houses.length){
            this.selectedHouse = this.houses[index];
            let description = 'Team Name: ' + this.selectedHouse.name + '\n';

            for (let i = 0; i < this.selectedHouse.guests.length; i ++){
                description += i + '- ' + this.selectedHouse.guests[i].name + ' - ' + this.selectedHouse.guests[i].status + '\n';
            }

            let selection = this.showHouseMenuOptions(description);
            switch(selection){
                case '1':
                    this.createGuest();
                    break;
                case '2':    
                    this.deleteGuest(); 
             }
        }
   }
   createGuest(){
    let name = prompt('Enter name for the new guest:');
    let status = prompt('Enter the status for your new guest:');
    this.selectedHouse.guests.push(new Guest(name, status));
   }
   deleteGuest(){
    let index = prompt('Enter the index of the player you wish to delete:');
    if(index > -1 && this.selectedHouse.guests.length) {
        this.selectedHouse.guests.splice(index, 1);
    }
   }
}

let menu = new Menu();
menu.start();

