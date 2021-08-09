$(document).ready(function(){
    
    var dataCountry;
    var allResult = []

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

    $.ajax({
        url: "https://restcountries.eu/rest/v2/all"
    })
    .done(function(r) {
        console.log(r)
        dataCountry = r
        for (let i = 0; i < r.length; i++) {
            $('#inlineFormCustomSelect').append(`<option value="${r[i].name}">${r[i].name}</option>`);
        }
        for (let j = 0; j < r.length; j++) {
            $('#CountryOrLocation').append(`<option value="${r[j].name}">${r[j].name}</option>`);
        }
        
        
    });


    $("#inlineFormCustomSelect").change(function(){
        let country = this.value;

        if (dataCountry) {
            for (let i = 0 ; i < dataCountry.length; i++) {
                if (dataCountry[i].name === country) {
                    $( "div.input-group-text" ).text( `+${dataCountry[i].callingCodes[0]}` );
                }
            }
        }
    });


    for (let i = 1 ; i <= 31; i++) {
        $('#dateOfBirth').append(`<option value="${i}">${i}</option>`);
    }

    console.log($('#customSwitch1').prop('checked'), 'di cek')

    $("#CountryOrLocation").change(function(){
        let country = this.value;

        $.ajax({
            url: "https://countriesnow.space/api/v0.1/countries"
        })
        .done(function(r) {
            console.log(r.data)
            for (let i = 0; i < r.data.length; i++) {
                if (country === r.data[i].country) {
                    console.log(r.data[i].cities)
                    let cities = r.data[i].cities
                    $('#ProvinceOrDistric').empty()
                    for (let j = 0; j < cities.length; j++) {
                        $('#ProvinceOrDistric').append(`<option value="${cities[j]}">${cities[j]}</option>`);
                    }
                }
            }
        });
    });


    $("#submitData").click(function(e) {
        

        var aggrement = $('#agreementCheck').is(":checked")


        var firstName = $('#inputFirstName').val()
        var lastName = $('#inputLastName').val()
        var phoneCode =  $('#numberCode').text()
        var phoneNumber =  $('#inputMobilePhone').val()
        var address = $('#inputAddress').val()
        var yourCountry = $('#CountryOrLocation').val()
        var yourState = $('#ProvinceOrDistric').val()
        var email = $('#inputEmailAddress').val()
        var birthDay = $('#dateOfBirth').val()
        var bdayMonth = $('#bdaymonth').val()
        var bdayYear = $('#bdayYear').val()
        var getSms ;
        var getEmail ;
        var getMailing ;
        if ($('#customSwitch1').prop('checked')) {
            getSms = 'yes'
        } else {
            getSms = 'no'
        }

        if ($('#customSwitch2').prop('checked')) {
            getEmail = 'yes'
        } else {
            getEmail = 'no'
        }

        if ($('#customSwitch3').prop('checked')) {
            getMailing = 'yes'
        } else {
            getMailing = 'no'
        }

        if (!aggrement) {
            swal("Error!", "Please accept the agreement", "error");
        } else {
            var errorMessage = ''
            if (!firstName) {
                errorMessage = errorMessage + '<p><strong>please input first name</strong></p>\n'
            }
            if (!lastName) {
                errorMessage = errorMessage + '<p><strong>please input last name</strong></p>\n'
            }
            if (!phoneNumber) {
                errorMessage = errorMessage + '<p><strong>please input phone number</strong></p>\n'
            }
            if (!yourCountry) {
                errorMessage = errorMessage + '<p><strong>please input country</strong></p>\n'
            }
            if (email == null) {
                errorMessage = errorMessage + '<p><strong>please input email</strong></p>\n'
            }
            if (!birthDay) {
                errorMessage = errorMessage + '<p><strong>please input birth day</strong></p>\n'
            }
            if (!bdayMonth) {
                errorMessage = errorMessage + '<p><strong>please input birth month</strong></p>\n'
            }
            if (!bdayYear) {
                errorMessage = errorMessage + '<p><strong>please input birth year</strong></p>\n'
            }

            if (errorMessage.length > 1) {
                swal({
                    title: "Error!",
                    content: {
                        element: 'div',
                        attributes: {
                        innerHTML: `${errorMessage}`,
                        },
                    },
                    icon: 'error'
                });
            } else {
                var counter = 0
                var title1 = $('#titleCheckBox1').is(":checked")
                var title2 = $('#titleCheckBox2').is(":checked")
                var title3 = $('#titleCheckBox3').is(":checked")
                var title4 = $('#titleCheckBox4').is(":checked")
                var title5 = $('#titleCheckBox5').is(":checked")

                var getTitle = ''
                if (title1) {
                    getTitle = 'Mrs'
                    counter++
                }
                if (title2) {
                    getTitle = 'Ms'
                    counter++
                }
                if (title3) {
                    getTitle = 'Mdm'
                    counter++
                }
                if (title4) {
                    getTitle = 'Mr'
                    counter++
                }
                if (title5) {
                    getTitle = 'Dr'
                    counter++
                }
                
                if (counter > 1) {
                    swal("Error!", "Please select only 1 title", "error");
                } else {
                    const template = (`<p>your name: <strong>${getTitle} ${firstName} ${lastName}</strong></p>\n
                        <p>your phone number: <strong>${phoneCode} ${phoneNumber}</strong></p>\n
                        <p>your address: <strong>${address}</strong></p>\n
                        <p>your country: <strong>${yourCountry}</strong></p>\n
                        <p>your state: <strong>${yourState}</strong></p>\n
                        <p>your email: <strong>${email}</strong></p>\n
                        <p>your birth day: <strong>${birthDay}-${bdayMonth}-${bdayYear}</strong></p>\n
                        <p>get sms & mobile call: <strong>${getSms}</strong></p>\n
                        <p>get email: <strong>${getEmail}</strong></p>\n
                        <p>get mailing: <strong>${getMailing}</strong></p>\n
                        `)
                    swal({
                        title: "Your Information",
                        content: {
                            element: 'div',
                            attributes: {
                            innerHTML: `${template}`,
                            },
                        },
                        icon: 'info'
                    });
                }

                
            }

            
        }
        
    })
})