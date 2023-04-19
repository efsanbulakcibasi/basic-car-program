var Filter = {
    Elements:{
        name: document.getElementById("name"),
        modal:document.getElementById("modal"),
        year: document.getElementById("year"),
        image:document.getElementById("img"),
        carArea: document.getElementById("car-area"),
        submit: document.getElementById("submit")
    },
    Status:{
        cars:[],
    },
    Actions:{
        init: () => {
            if (localStorage.getItem("cars")) {
                var lcoalStrgData= JSON.parse(localStorage.getItem("cars"))
                Filter.Status.cars = lcoalStrgData;
                Filter.Actions.appendToHtml()
            }
        },
        getValue: () =>{
            var name = Filter.Elements.name.value;
            var modal = Filter.Elements.modal.value;
            var year = Filter.Elements.year.value;
            var image = Filter.Elements.image.value;
            var car = {name, modal,year,image}
            Filter.Status.cars.push(car);
            localStorage.setItem("cars", JSON.stringify(Filter.Status.cars))
            Filter.Actions.appendToHtml();
        },
        appendToHtml: () => {
            Filter.Elements.carArea.innerHTML =""
            var cars = Filter.Status.cars

            for (let i = 0; i < cars.length; i++) {
                const car = cars[i];
                var carHtml= 
                "<a class='b-item-01'>"+
                    "<div class='b-item-02'>"+
                        "<h5 class='b-item-02-A'>"+car.name+ "</h5>"+
                        "<p class='b-item-02-A'>" +car.modal+ "</p>"+
                        "<span class='b-item-02-A'>" +car.year+ "</span>"+
                    "</div>"+
                    "<img class='b-item-03' src="+car.image+" >" +
                    "<ul class='b-item-04'>"+
                    "<li>"+"<button onclick='Filter.Actions.editCar("+ i +")'>Düzenle</button>" + "<button onclick='Filter.Actions.deleteCar("+ i +")'>Sil</button>"+"</li>" +
                    "</ul>"+
                 "</a>"
                 Filter.Elements.carArea.innerHTML += carHtml;
            }
        },

    

        editCar: (carIndex) => {
            var car = Filter.Status.cars[carIndex];
            Filter.Elements.name.value = car.name;
            Filter.Elements.modal.value = car.modal;
            Filter.Elements.year.value = car.year;
            Filter.Elements.image.value = car.image;
            Filter.Elements.submit.value = "Düzenle";
            Filter.Elements.submit.setAttribute("onclick",'Filter.Actions.saveEdit('+carIndex+');')
        },

        saveEdit: (carIndex) => {
            var name = Filter.Elements.name.value;
            var modal = Filter.Elements.modal.value;
            var year = Filter.Elements.year.value;
            var image = Filter.Elements.image.value;
            var car = {name, modal, year, image};
            Filter.Status.cars[carIndex] = car;
            localStorage.setItem("cars", JSON.stringify(Filter.Status.cars));
            Filter.Elements.submit.value ="Kaydet";
            Filter.Actions.appendToHtml();
            Filter.Actions.resetInput();
            Filter.Elements.submit.setAttribute("onclick","Filter.Actions.getValue()")
        },

        deleteCar: (carIndex) =>{
            Filter.Status.cars.splice(carIndex,1);
            localStorage.setItem("cars", JSON.stringify(Filter.Status.cars));
            Filter.Actions.appendToHtml();

        },
        resetInput: () => {
            Filter.Elements.name.value = "";
            Filter.Elements.modal.value = "";
            Filter.Elements.year.value = "";
            Filter.Elements.image.value = "";
        },

    }
}

Filter.Actions.init()