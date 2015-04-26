/**
 * Created by adityamangipudi1 on 4/24/15.
 */
document.addEventListener('DOMContentLoaded', function () {




    var loginbutton = document.querySelector('input.login')

    loginbutton.addEventListener('click', function(event){

        event.preventDefault();
        if( checkPassword(document.forms.userLogin.password.value)&&
            checkEmail(document.forms.userLogin.email.value)){
           // console.log('works')
            makePOSTAjaxCall('/login', {email: document.forms.userLogin.email.value ,
                password: document.forms.userLogin.password.value}, function(xhr){
                if(xhr.readyState===4){

                    var response = JSON.parse(xhr.responseText)
                    //console.log(response)
                    if(typeof response.name ==='undefined' && response.length!==0 ) {
                        var cookie = document.cookie.split('; ').pop()
                        //console.log(cookie)
                       // console.log('session created')
                        document.querySelector('div.unauthenticated-user').classList.add('hide')
                        document.querySelector('div.authenticated-user').classList.remove('hide')
                    }else{
                        var loginheader = document.querySelector('.login-title');

                        loginheader.innerHTML = 'The email and password is invalid. Please try signing up first.'

                        //make sure they are signed up
                        //console.log('session not created. use correct email and password')
                    }

                }

            })
            document.forms.userLogin.reset()
        }else{
            var loginheader = document.querySelector('.login-title');

            loginheader.innerHTML = 'There was an error. Please make sure fields are entered properly.'

           // console.log('Please enter valid username and password')
        }
    })
    function checkPassword(str)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters that are letters, numbers or the underscore
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
        return (re.test(str));
    }
    function checkEmail(str)
    {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(str);
    }
    function makePOSTAjaxCall(url, obj, callback) { // obj is optional depending on the request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        });
        xhr.send(JSON.stringify(obj));

    }
});
