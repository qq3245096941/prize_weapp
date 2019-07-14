<?php
/**
 * v_dining模块小程序接口定义
 *
 * @author QQRPazWaNPgW
 * @url
 */
defined('IN_IA') or exit('Access Denied');

class V_prizeModuleWxapp extends WeModuleWxapp
{

    /**
     * 获取抽奖设置
     */
    public function doPageGet_prize_setting()
    {
        $prize_setting = pdo_getall("ims_v_prize_prize_setting")[0];
        $prize_setting['prize_back'] = tomedia($prize_setting['prize_back']);
        return $this->result(0, "获取成功", $prize_setting);
    }

    /**
     * 获取抽奖号码，已经获取的号码不能再出现，
     * 传入的参数：nickname
     */
    public function doPageStart_prize()
    {
        global $_W, $_GPC;

        $current_prize_code = $this->getPrize_code();

        /*在中奖码表中查询*/
        $prize_code = pdo_get('ims_v_prize_winning_code', ['prize_code' => $current_prize_code], ['prize_code']);
        while ($prize_code == true) {
            $current_prize_code = $this->getPrize_code();
            $prize_code = pdo_get('ims_v_prize_user', ['prize_code' => $current_prize_code], ['prize_code']);
        }

        pdo_insert("ims_v_prize_winning_code",
            [
                "prize_code"=>$current_prize_code,
                'nickname'=>$_GPC['nickname'],
                'create_time'=>time()
            ]
        );
        
        return $this->result(0, "以获取抽奖号码",$current_prize_code);
    }

    /**
     * 通过rand函数获取一个随机数，并执行9次
     */
    public function getPrize_code()
    {
        $prize_code = [];
        for ($i = 0; $i < 7; $i++) {
            array_push($prize_code, rand(0, 9));
        }
        return implode($prize_code);
    }
  
    /**
     * 获取当前用户所有抽奖码，传入参数为nickname
     */
    public function doPageUser_prize_code(){
        global $_W,$_GPC;
        return $this->result(0,'获取抽奖码成功',pdo_getall("ims_v_prize_winning_code",['nickname'=>$_GPC['nickname']]));
    }

    /**
     * 保存用户信息，传入参数：nickname,avatar
     */
    public function doPageSet_userinfo()
    {
        global $_W, $_GPC;

        $user = pdo_get("ims_v_prize_user", ["avatar" => $_GPC['avatar']]);
        if ($user == false) {
            pdo_insert("ims_v_prize_user", [
                "nickname" => $_GPC['nickname'],
                "avatar" => $_GPC['avatar'],
                "openid" => $_W["openid"]
            ], true);

            $user = pdo_get("ims_v_prize_user", ['nickname' => $_GPC['nickname']]);
        }
        return $this->result(0, "保存用户成功", $user);
    }
  
    /**
     * 保存用户真实姓名，插入的参数为：nickname,name
     */
    public function doPageSet_user_name()
    {
        global $_W, $_GPC;
        pdo_update("ims_v_prize_user", ['name' => $_GPC['name']], ['nickname' => $_GPC['nickname']]);
        return $this->result(0, "保存名称成功", pdo_get("ims_v_prize_user", ["nickname" => $_GPC['nickname']]));
    }

    /**
     * 保存用户的手机号，插入的参数为：nickname,phone
     */
    public function doPageSet_user_phone()
    {
        global $_W, $_GPC;
        pdo_update("ims_v_prize_user", ["phone" => $_GPC['phone']], ['nickname' => $_GPC['nickname']]);
        return $this->result(0, "保存电话成功", pdo_get("ims_v_prize_user", ['nickname' => $_GPC['nickname']]));
    }

    /**
     * 保存用户抽奖次数，传入参数为：nickname,lottery_number
     */
    public function doPageSet_user_lottery_number()
    {
        global $_W, $_GPC;
        pdo_update("ims_v_prize_user", ["lottery_number" => $_GPC['lottery_number']], ['nickname' => $_GPC['nickname']]);
        return $this->result(0, "保存次数成功", pdo_get("ims_v_prize_user", ['nickname' => $_GPC['nickname']]));

    }

    /**
     * 保存用户地理位置，传入参数为：nickname,address
     */
    public function doPageSet_user_address()
    {
        global $_W, $_GPC;
        pdo_update("ims_v_prize_user", ["address" => $_GPC['address']], ['nickname' => $_GPC['nickname']]);
        return $this->result(0, "保存位置成功", pdo_get("ims_v_prize_user", ['nickname' => $_GPC['nickname']]));
    }

    /**
     * 用户获取一次摇动抽奖号码的机会，传入参数为:nickname
     */
    public function doPageAdd_Lottery_number()
    {
        global $_GPC, $_W;
        pdo_query("update ims_v_prize_user set lottery_number=lottery_number+1 where nickname='" . $_GPC['nickname'] . "'");
        return $this->result(0, "增加次数成功", pdo_get("ims_v_prize_user", ['nickname' => $_GPC['nickname']]));
    }

    /**
     * 获得系统设置
     */
    public function doPageSystem_setting()
    {
        $system_setting = pdo_getall("ims_v_prize_system_setting")[0];
        $system_setting['slideshow'] = iunserializer($system_setting['slideshow']);

        foreach ($system_setting['slideshow'] as $key => $img) {
            $system_setting["slideshow"][$key] = tomedia($img);
        }
        return $this->result(0, "获取成功", $system_setting);
    }

    /**
     * 获取所有商品
     */
    public function doPageGet_shops_all()
    {
        $shops = pdo_getall("ims_v_prize_shop");
        foreach ($shops as $key => $shop) {
            $shops[$key]['img'] = tomedia($shop['img']);
        }
        return $this->result(0, "获取成功", array_reverse($shops));
    }

    /**
     * 获取缓存中的随机数，将用户扫码进入后，传入的随机数进行对比，不想等则此缓存的随机数是过期随机数
     */
    public function doPageGet_ran(){
        return $this->result(0,"获取随机数成功",cache_read("ran"));
    }

    /**
     * 将缓存中的随机数设置为空
     */
    public function doPageSet_ran(){
        cache_write("ran",'');
        return $this->result(0,"设置成功",cache_write('ran'));
    }
}