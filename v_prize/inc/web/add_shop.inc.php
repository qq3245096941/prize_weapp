<?php

global $_W,$_GPC;

if($_W['ispost']==true){
    pdo_insert("ims_v_prize_shop",
        [
            'id'=>$_GPC['id'],
            "name"=>$_GPC['name'],
            "img"=>$_GPC['img']
        ],true
    );
    message("保存成功",$this->createWebUrl("shop_manager"),"success");
}

$shop = pdo_get("ims_v_prize_shop",['id'=>$_GPC['id']]);

include_once $this->template("add_shop");