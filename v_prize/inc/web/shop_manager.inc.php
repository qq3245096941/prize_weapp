<?php
global $_W,$_GPC;

if($_GPC['shop_state']=='delete'){
    pdo_delete("ims_v_prize_shop",['id'=>$_GPC["id"]]);
    message("删除成功",$this->createWebUrl('shop_manager'),"success");
}

$shops = pdo_getall("ims_v_prize_shop");

$shops = array_reverse($shops);

include $this->template("shop_manager");