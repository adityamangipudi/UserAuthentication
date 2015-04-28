/**
 * Created by adityamangipudi1 on 4/24/15.
 */
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelector('ul.ulList');


    links.addEventListener('click', function(event){
        var loginheader = document.querySelector('.login-title');
        var signupheader = document.querySelector('.signup-title');
        var userCreatedheader = document.querySelector('.user-created');
        var signupdiv = document.querySelector('.signUpInfo');
        var logindiv = document.querySelector('.loginInfo');
        //console.log(event.target)

        if((event.target.id === 'signup'||event.target.id === 'login')&&
            (!(userCreatedheader.classList.contains('hide')))){
            signupheader.innerHTML = 'Please Sign Up with Email and Password';
            loginheader.innerHTML = 'Please Login with Email and Password';

            userCreatedheader.classList.add('hide');
            if(event.target.id === 'signup'){
                signupdiv.classList.toggle('hide');
                signupheader.classList.toggle('hide');
            }else{
                logindiv.classList.toggle('hide');
                loginheader.classList.toggle('hide');
            }

        }
        else if(event.target.id === 'signup'&&(userCreatedheader.classList.contains('hide'))){
            signupheader.innerHTML = 'Please Sign Up with Email and Password';
            loginheader.innerHTML = 'Please Login with Email and Password';

            if(signupheader.classList.contains('hide')){

                loginheader.classList.toggle('hide');
                signupheader.classList.toggle('hide');
                signupdiv.classList.toggle('hide');
                logindiv.classList.toggle('hide');

            }

        }else if(event.target.id === 'login'&&(userCreatedheader.classList.contains('hide'))){
            signupheader.innerHTML = 'Please Sign Up with Email and Password';
            loginheader.innerHTML = 'Please Login with Email and Password';


            if(loginheader.classList.contains('hide')){

                loginheader.classList.toggle('hide');
                signupheader.classList.toggle('hide');
                signupdiv.classList.toggle('hide');
                logindiv.classList.toggle('hide');
            }

        }
    })

    var signupbutton = document.querySelector('input.signup')
    signupbutton.addEventListener('click', function(event){
        var signupheader = document.querySelector('.signup-title');
        var signupdiv = document.querySelector('.signUpInfo');
        var userCreatedheader = document.querySelector('.user-created');

        event.preventDefault();
        if( checkPassword(document.forms.userSignUp.password.value)&&
            checkEmail(document.forms.userSignUp.email.value)&&(document.forms.userSignUp.name.value.length>0)){
            //console.log('works')
            makePOSTAjaxCall('/signup', {email: document.forms.userSignUp.email.value,
                name:document.forms.userSignUp.name.value,
                password: document.forms.userSignUp.password.value}, function(xhr){

                if(xhr.readyState===4){

                      var response = JSON.parse(xhr.responseText);
                     console.log(response);
                    if( response.name !=='MongoError' && response.name !=='ValidationError') {
                       // console.log('user created')

                        signupheader.classList.toggle('hide');
                        signupdiv.classList.toggle('hide');
                        userCreatedheader.classList.remove('hide');


                    }else{
                        signupheader.innerHTML = 'There was an error. Please try again';
                        //console.log('user not created. use different email')
                    }

                }

            })
            document.forms.userSignUp.reset();
        }else{
            signupheader.innerHTML = 'There was an error. Please try again';

            //console.log('Please enter matching passwords that meet the requirements and fill all fields')
        }
    })
    function checkPassword(str)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters that are letters, numbers or the underscore
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
        return (re.test(str) && (str === document.forms.userSignUp.confirmpassword.value));
    }
    function checkEmail(str)
    {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(str);
    }
    function makePOSTAjaxCall(url, obj, callback) { // obj is optional depending on the request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        });
        xhr.send(JSON.stringify(obj));

    }

});
