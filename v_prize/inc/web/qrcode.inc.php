<?php

global $_W,$_GPC;

$setting = pdo_getall($this->system_setting)[0];

$rest = ihttp_get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$setting['appid']."&secret=".$setting['appsecret']);

$access_token = json_decode($rest['content'],true)['access_token'];

/*获取一个随机数，并且将随机数写入缓存，并传递给小程序端*/
$ran = random("10",true);
cache_write("ran",$ran);

$post_rest = ihttp_post("https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=$access_token",json_encode([
    "scene"=>$ran,
    "page"=>"pages/prize"
]));

$post_rest['content'] = base64_encode($post_rest['content']);

include_once $this->template("qrcode");