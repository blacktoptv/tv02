//DO EDIT BELOW
var YouTubeId = '3VnQrHY3vVQ';
var VideoTitle = 'ขอเรียนเชิญพนักงาน KMP ทุกท่านเข้าร่วมรับชมและรับฟังการสื่อสาร ';
var TagLine = 'K.M. Packaging PCL. เพราะเราเชื่อว่า “บรรจุภัณฑ์” เป็นมากกว่าภาชนะที่ใช้สินค้า.... KMP หรือ บริษัท เค.เอ็ม. แพ็กเกจจิ้ง จำกัด (มหาชน) ผู้เชี่ยวชาญในการผลิตบรรจุภัณฑ์สำหรับอาหารและเครื่องดื่ม ก่อตั้งขึ้นในปี พ.ศ. 2527 ด้วยแนวคิดที่ว่า “บรรจุภัณฑ์ นั้นสามารถเป็นมากกว่าแค่ภาชนะ แต่ยังสามารถสร้างแบรนด์ และเพิ่มมูลค่าสินค้าของลูกค้าได้';
//var YouTubeId = 'CYIgPsFMf0o';


//DO NOT EDIT
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
    playerDefaults = {
        mute: 0,
        autoplay: 1,
        autohide: 1,
        modestbranding: 0,
        rel: 0,
        showinfo: 0,
        loop: 1,
        controls: 1,
        disablekb: 1,
        enablejsapi: 0,
        iv_load_policy: 3
    };
var vid = [{
        'videoId': YouTubeId,
        'startSeconds': 1,
        'endSeconds': 999999,
        'suggestedQuality': 'hd480'
    },],
    randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;
$('.hi em:last-of-type').html(vid.length);
function onYouTubePlayerAPIReady() {
    tv = new YT.Player('tv', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: playerDefaults
    });
}
function onPlayerReady() {
    tv.loadVideoById(vid[currVid]);
    //tv.mute();
}
var ErrorCode = {
    '-1': 'Unstarted',
    0: 'ended',
    1: 'Playing',
    2: 'Paused',
    3: 'Buffering',
    5: 'Video cued',
}
//-1 – unstarted
// 0 – ended
// 1 – playing
// 2 – paused
// 3 – buffering
// 5 – video cued


function onPlayerStateChange(e) {
    console.log('Error Code: ' + e.data);
    var status = document.getElementById('status-code');
    var title = document.getElementById('video-title');
    var tag = document.getElementById('video-tag');
    status.innerHTML = 'Code : ' + e.data + ' (' + ErrorCode[e.data] + ')';
    title.innerHTML = VideoTitle;
    tag.innerHTML = TagLine;


    console.dir(e);
    if (e.data === YT.PlayerState.ENDED) {
        tv.loadVideoById(vid[currVid]);
    } else if (e.data === 1) {
        $('#tv').addClass('active');
        $('.hi em:nth-of-type(2)').html(currVid + 1);
        tv.unMute();
    } else if (e.data === 2) {
        $('#tv').removeClass('active');
        if (currVid === vid.length - 1) {
            currVid = 0;
        } else {
            currVid++;
        }
        tv.loadVideoById(vid[currVid]);
        //tv.seekTo(vid[currVid].startSeconds);
    }
}
function vidRescale() {
    var w = $(window).width(),
        h = $(window).height();
    if (w / h > 16 / 9) {
        tv.setSize(w, w / 16 * 9);
        $('.tv .screen').css({
            'left': '0px'
        });
    } else {
        tv.setSize(h / 9 * 16, h);
        $('.tv .screen').css({
            'right': -($('.tv .screen').outerWidth() - w) / 2
        });
    }
}
$(window).on('load resize', function () {
    vidRescale();
});
$('.hi span:first-of-type').on('click', function () {
    $('#tv').toggleClass('mute');
    $('.hi em:first-of-type').toggleClass('hidden');
    if ($('#tv').hasClass('mute')) {
        tv.mute();
    } else {
        tv.unMute();
    }
});
$('.hi span:last-of-type').on('click', function () {
    $('.hi em:nth-of-type(2)').html('~');
    tv.pauseVideo();
});


/* JavaScript for the clock only */
function updateTime() {
    var dateInfo = new Date();
    // get computer time
    var hr,
        _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
        ampm = (dateInfo.getHours() > 12) ? "PM" : "AM";
    if (dateInfo.getHours() == 0) {
        hr = 12;
    } else if (dateInfo.getHours() > 12) {
        hr = dateInfo.getHours() - 12;
    } else {
        hr = dateInfo.getHours();
    }
    var currentTime = hr + ":" + _min;
    // print time
    document.querySelector(".hm").innerHTML = currentTime;
    document.querySelector(".ampm").innerHTML = ampm;
};
// print time and date once, then update them every second
updateTime();
setInterval(function () {
    updateTime()
}, 1000);