<?php

global $_W,$_GPC;

$prize_setting = pdo_getall($this->prize_setting)[0];

//获取抽奖码不为空的用户
$users = pdo_fetchall("select * from ".$this->user." where prize_code !=''");

if($_W['ispost']==true){
    pdo_insert($this->prize_setting,[
        "id"=>$_GPC['id'],
        "prize_back"=>$_GPC['prize_back'],
        "the_winners"=>htmlspecialchars_decode($_GPC['the_winners']),
        "last_the_winners"=>htmlspecialchars_decode($_GPC['last_the_winners']),
        "lottery_time"=>strtotime($_GPC['lottery_time']),
        "awards_show"=>htmlspecialchars_decode($_GPC['awards_show']),
        "setting_regulation"=>htmlspecialchars_decode($_GPC['setting_regulation'])
    ],true);

    message("保存成功",$this->createWebUrl('prize_setting'));
}

include_once $this->template('prize_setting');


