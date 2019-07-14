<?php

global $_W,$_GPC;

$users = pdo_getall($this->user,["prize_code"=>$_GPC['prize_code']]);

include_once $this->template("users_setting");

