jQuery("#add_user").submit(function(event) {
    alert("Data Inserted Successfully!");
});

jQuery("#update_user").submit(function(event) {
    event.preventDefault();

    var unindexed_array = jQuery(this).serializeArray();
    var data = {};

    jQuery.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    });

    var request = {
        "url": `http://localhost:4000/api/users/${data.id}`,
        'method': 'PUT',
        "data": data
    }

    jQuery.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    });
});

if(window.location.pathname =="/") {
    $ondelete = jQuery(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = jQuery(this).attr("data-id");

        var request = {
            "url": `http://localhost:4000/api/users/${id}`,
            "method": "DELETE",
            "data": data
        }

        if(confirm("Do you really want to delete this record?")) {
            jQuery.ajax(request).done(function(response) {
                alert("Data Delete Successfully!");
                location.reload();
            });
        }
    }) 
}