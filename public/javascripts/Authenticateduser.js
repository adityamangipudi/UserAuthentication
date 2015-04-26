/**
 * Created by adityamangipudi1 on 4/25/15.
 */
document.addEventListener('DOMContentLoaded', function () {


    var loginheader = document.querySelector('.login-title');

    document.querySelector('a#logout').addEventListener('click', function(event){
        loginheader.innerHTML ='Please Login with Email and Password'
        document.querySelector('div.authenticated-user').classList.add('hide')
        document.querySelector('div.unauthenticated-user').classList.remove('hide')


    })


    document.querySelector('button.getContacts').addEventListener('click', function(event){
        callback=function(xhr){
            if(xhr.readyState===4){

                var response = JSON.parse(xhr.responseText)

                if(Array.isArray(response)){
                    console.log(response)
                }
                else{
                    loginheader.innerHTML ='Please Login with Email and Password'
                    document.querySelector('div.authenticated-user').classList.add('hide')
                    document.querySelector('div.unauthenticated-user').classList.remove('hide')


                }
            }


        }
        makeAjaxCall('/session', callback)
    })

    function makeAjaxCall(url, callback) { // obj is optional depending on the request
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        });
        xhr.send()
    }
});
