
async function registerKey() {
    const checkID = document.getElementById("checkID").value
    const key = document.getElementById("key").value
    try {
        const response = await fetch("/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checkID: checkID, key: key })
        });
        response.text().then(function (text) {
            $("#resultStatus").text(text)
            $("#resultStatus").show()
        });
    } catch (error) {
        if (checkID == "") {
            $("#resultStatus").text("Please insert your Digital Check ID.")
        }
        else if (key == "") {
            $("#resultStatus").text("Please insert a key.")
        } else {
            $("#resultStatus").text("Transaction Failed! " + error)
        }
        console.log(error)
        $("#resultStatus").show()
    }
}

$(document).ready(function () {
    document.getElementById('resultModal').addEventListener('hidden.bs.modal', function (event) {
        $("#resultStatus").hide()
    })
})
