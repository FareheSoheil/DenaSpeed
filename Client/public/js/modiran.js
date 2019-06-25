(function(Main, undefined){
   console.log("Main JS File!"); 
}(window.Main == window.Main || {} ));

(function(Controller, undefined){
   console.log("Controller JS File!"); 
   var a = "Controler Name";
}(Main.Controller == Main.Controller || {} ));