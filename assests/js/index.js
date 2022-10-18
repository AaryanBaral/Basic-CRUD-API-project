$("#add_user").submit(function(event){
    alert("data saved succesfully.")
})
$("#Signup").submit(function(event){
  alert("data saved succesfully.")
})

$("#update_user").submit(function(event){
      event.preventDefault();
      var array = $(this).serializeArray();
      var data = {}
      $.map(array, function(user, index){
        data[user['name']] = user['value'] 
      })
      var request = {
        "url": `http://localhost:3000/api/user/${data.id}`,
        "method" :"PUT",
        "data": data
      }
      $.ajax(request).done(function(response){
        alert("data updated sucessfully!");
      })

})


if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function(){
       var  id =  $(this).attr("data-id")
       var request = {
        "url": `http://localhost:3000/api/user/${id}`,
        "method" :"DELETE"
      }
      if(confirm("do you really want to delete this data?")){
        $.ajax(request).done(function(response){
            alert("data deleted sucessfully!");
            location.reload();
          })
    }
    })
    

}
