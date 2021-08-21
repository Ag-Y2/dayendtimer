document.addEventListener("DOMContentLoaded", function() {

});

window.addEventListener("load", function(event) {
    vue_init();
}, false);

function vue_init() {

    var dayend = new Vue({
        el: "#dayend",
        data: {
            time: ""
        },
        methods: {
            getNow: function() {
                var _vDate = new Date('12/10/2021 18:30:00');
                var now = new Date();

                var day_start = new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 08:30:00`);
                var lunch_time_date = new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 12:25:00`);
                var lunch_timeend_date = new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 13:30:00`);
                var end_time_date = new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 18:30:00`);

                var wtime = is_between(now, day_start, end_time_date);

                if (wtime) {
                    _vDate = end_time_date;

                    var _second = 1000;
                    var _minute = _second * 60;
                    var _hour = _minute * 60;
                    var _day = _hour * 24;

                    var timeDef = _vDate - now;

                    var day = Math.floor(timeDef / _day);
                    var hour = Math.floor((timeDef % _day) / _hour);
                    var minute = Math.floor((timeDef % _hour) / _minute);
                    var second = Math.floor((timeDef % _minute) / _second);
                    var rTime = hour + " : " + minute + " : " + second;

                    this.time = rTime;
                } else {
                    //    _vDate = new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}  23:30:00`);
                    this.time = "컴 꺼";

                }


                function is_between(x, min, max) {
                    return x >= min && x <= max;
                }


                // console.log(now.getTime());
                // console.log(lunch_time_date.getHours(), now.getMinutes());



            }
        },
        mounted: function() {
            setInterval(this.getNow, 1000);
        }

    })



    var lastday = new Vue({
        el: "#lastday",
        data: {

            dday: "12/10/2021 18:30:00",

            time: {
                "date": "",
                "hrs": "",
                "mins": "",
                "sec": ""
            },
        },
        methods: {
            getNow: function() {
                var _vDate = new Date(this.dday);
                var now = new Date();
                var _second = 1000;
                var _minute = _second * 60;
                var _hour = _minute * 60;
                var _day = _hour * 24;
                var timer;


                var timeDef = _vDate - now;

                var day = Math.floor(timeDef / _day);
                var hour = Math.floor((timeDef % _day) / _hour);
                var minute = Math.floor((timeDef % _hour) / _minute);
                var second = Math.floor((timeDef % _minute) / _second);
                var rTime = " : " + hour + " : " + minute + " : " + second;

                this.time['date'] = day;
                this.time['hrs'] = hour;
                this.time['mins'] = minute;
                this.time['sec'] = second;
            },
            check_url: function() {
                console.log('hi');
                var url = window.location.href;
                var is_tploc = new RegExp('remain=*');
                if (is_tploc.test(url)) {
                    var tpTarget = url.match("\\main=([0-9]+)").pop();

                    var _dday = `${tpTarget.slice(4, 6)}/${tpTarget.slice(6, 8)}/${tpTarget.slice(0, 4)} 18:30:00`;

                    this.dday = _dday;
                }
            }
        },
        mounted: function() {

            this.check_url();
            setInterval(this.getNow, 1000);

        }
    });

}