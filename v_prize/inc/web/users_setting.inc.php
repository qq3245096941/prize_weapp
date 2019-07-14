<?php

global $_W,$_GPC;

$users = pdo_getall($this->user);

if($_GPC["user_state"]=='clear'){
    /*删除所有未中奖的数据*/
    pdo_delete($this->winning_code,['is_winning_code'=>0]);
    /*清除已中奖数据的nickname*/
    /*pdo_query("UPDATE ".$this->winning_code." SET nickname='' WHERE is_winning_code=1");*/
    message("清理成功",$this->createWebUrl('users_setting'),"success");
}


/*更换抽奖码为中奖码*/
if($_GPC['user_state']=='update'){
    pdo_update($this->winning_code,['is_winning_code'=>1],["id"=>$_GPC['id']]);
    message("标记成功",$this->createWebUrl('users_setting'),"success");
}


/*查询*/
if($_GPC['query_prize_code']!=null){
    $nickname = pdo_get($this->winning_code,['prize_code'=>$_GPC['query_prize_code']],['nickname']);
    $users = pdo_getall($this->user,['nickname'=>$nickname]);
}

foreach ($users as $key => $user){
    $users[$key]['prize_code'] = pdo_getall("ims_v_prize_winning_code",['nickname'=>$user['nickname']]);
}

array_reverse($users);

include_once $this->template('users_setting');