<?php

global $_W,$_GPC;

if($_W['ispost']==true){
    pdo_insert("ims_v_prize_system_setting",
        [
            "id"=>$_GPC['id'],
            "title"=>$_GPC['title'],
            "slideshow"=>iserializer($_GPC['slideshow']),
            "phone"=>$_GPC["phone"],
            "appid"=>$_GPC['appid'],
            "appsecret"=>$_GPC['appsecret']
        ],true
    );

    message("保存成功",$this->createWebUrl('system_setting'),"success");
}

$system_setting = pdo_getall("ims_v_prize_system_setting")[0];
$system_setting['slideshow'] = iunserializer($system_setting['slideshow']);

include_once $this->template('system_setting');