DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  level int NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  nickname varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  mobile varchar(255) NOT NULL,
  fullname varchar(255) NOT NULL,
  gender int NOT NULL,
  status int NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO user
VALUES (
    NULL,
    1,
    'admin',
    MD5('123456'),
    '天动万象',
    'admin@email.com',
    '18888888888',
    '钟离',
    1,
    1,
    NOW(),
    NOW()
  ),
  (
    NULL,
    10,
    'admin-01',
    MD5('123456'),
    '梦想真说',
    'admin-01@email.com',
    '18800001111',
    '雷电影',
    0,
    1,
    NOW(),
    NOW()
  ),
  (
    NULL,
    10,
    'admin-02',
    MD5('123456'),
    '风神之诗',
    'admin-02@email.com',
    '18800002222',
    '温迪',
    1,
    1,
    NOW(),
    NOW()
  ),
  (
    NULL,
    1000,
    'user-01',
    MD5('123456'),
    '蹦蹦炸弹',
    'user-01@email.com',
    '18822221111',
    '可莉',
    0,
    1,
    NOW(),
    NOW()
  ),
  (
    NULL,
    1000,
    'user-02',
    MD5('123456'),
    '万叶之一刀',
    'user-02@email.com',
    '18822222222',
    '枫原万叶',
    1,
    1,
    NOW(),
    NOW()
  );
DROP TABLE IF EXISTS links;
CREATE TABLE links (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  link varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO links
VALUES (
    NULL,
    '明珠号',
    'https://mzmedia.eastday.com',
    '/static/image/friend-links/202205011601430400017377.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '简书',
    'https://www.jianshu.com',
    '/static/image/friend-links/202205011601501120121281.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '百度搜索',
    'https://www.baidu.com',
    '/static/image/friend-links/202205011601547004626985.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '百度翻译',
    'https://fanyi.baidu.com',
    '/static/image/friend-links/202205011602002970363700.png',
    NOW(),
    NOW()
  );
DROP TABLE IF EXISTS notice;
CREATE TABLE notice (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  level int NOT NULL,
  title TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO notice
VALUES (
    NULL,
    10,
    '管理员才能看到的公告消息',
    '这是一条只有管理员用户才能看到的公告消息，不会被登录的普通用户看到的公告消息。',
    NOW(),
    NOW()
  ),
  (
    NULL,
    2000,
    '所有登录用户都能看到的公告消息',
    '这是一条所有登录的用户都能看到的公告消息。',
    NOW(),
    NOW()
  ),
  (
    NULL,
    2000,
    '感谢用户使用本系统',
    '感谢所有注册用户使用本系统。',
    NOW(),
    NOW()
  );
DROP TABLE IF EXISTS news_type;
CREATE TABLE news_type (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  label varchar(255) NOT NULL,
  value int NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO news_type
VALUES (NULL, '娱乐', 1001, NOW(), NOW()),
  (NULL, '体育', 1002, NOW(), NOW()),
  (NULL, '军事', 1003, NOW(), NOW()),
  (NULL, '笑话', 1004, NOW(), NOW()),
  (NULL, '游戏', 1005, NOW(), NOW());
DROP TABLE IF EXISTS news;
CREATE TABLE news (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  uk varchar(255) NOT NULL,
  title TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  thumbnail varchar(255) NOT NULL,
  type int NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO news
VALUES (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000001'),
    '新疆青年直播电商现状调查：带货主播短缺，部分直播基地空置',
    '<p><img src="/static/image/news-info/202205041932158367220412.jpeg" alt=""></p><p>洛蓝古丽团队。受访者供图</p><p>手机直播支架正对着一张严重磨损掉漆的长条桌，金丝玉、和田玉、海蓝宝石、碧玺……一块块大小不一的原石在小别克快手网络直播间次第登场。镜头外，即使是深夜，也聚集着排队送货的牧民和玉石老板。</p><p>这其中就有新疆阿勒泰地区福海县阔乡的牧民杰肯。放牧之余，他在戈壁和河坝里捡拾金丝玉，每月在小别克玉石直播间的平均卖货收入达1.5万元。</p><p>32岁的哈萨克族“石农”加尼别克·赛力克是新疆小别克金丝玉直播团队的负责人，团队营收方式靠收取快手平台的5%带货提成，由于没有中间商赚差价，团队的名气越来越大，如今已有2500多个石农为直播间提供原石。</p><p>直播电商成为新疆经济增长新引擎，和小别克团队一样的青年从业者占据主力军。新疆数字经济研究院、新疆大学经济与管理学院教授陈兵带领团队调研完成的《新疆直播电商发展调研报告（2021）》（以下简称“调研报告”）指出，2021年9-11月新疆直播带货主播的直播GMV（商品交易总额）突破17亿元，其中抖音平台直播GMV约3亿元，快手平台直播GMV约14亿元。</p><p>与此同时，新疆直播电商中亦存在“人”“货”“场”的难题，直播带货人才匮乏，缺少集中公开的供应链平台，部分直播基地空置未能有效运用。</p><p>带货主播短缺</p><p>3月24日17时，在华凌珠宝玉石城4楼，玉海之家玉石店已经关闭了竹帘和防盗门，开始了网上直播带货。璋娟玉器店门口贴着“招主播”的告示，老板张庆娟正为找不到合适的直播带货主播发愁。“我要开店运营，还要开两个号直播，根本忙不过来，但是合适的主播太难找了。”张庆娟说。</p><p>数据显示，2021年9-11月，快手、抖音平台直播GMV超过10万元的新疆直播带货主播的GMV排名前3的地州市分别是乌鲁木齐市、和田地区、伊犁哈萨克自治州；从品类看，珠宝配饰品类直播GMV远高于其他产品品类，其次是食品、美妆个护、家居用品等。</p>',
    '/static/image/news-info/202205041925381196540364.jpeg',
    1001,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000001'),
    '《闯关东》原班人马再携手，彰显英雄气概和爱国情怀',
    '<p>由高满堂、黄宏任总编剧，张新建任总导演，巩峥、宋佳伦、李乃文、王媛可、萨日娜等主演的年代传奇剧《运河风流》，于4月29日19：30在北京卫视开播。</p><p>《运河风流》从民国初期黄、宋两家争祭河神庙事件讲起，跨越近三十年风云际会的历史变迁，以“济宁三杰”三大家族的故事串起诸多人物的爱情、亲情、友情，描述了运河沿岸的华夏儿女最为真实的生活状态与宗族结构。剧中，既有运河沿岸红红火火的繁荣景象，也有“铁路兴、运河荒”的哀叹，在时代的洪流中，有人迷失自我，有人坚守信念，有人随波逐流，有人舍生忘死。透过《运河风流》，观众可以看到济宁漕运地区三大家族的兴衰沉浮，还有他们的子孙后代在运河沿岸进行不屈不挠的抗日革命斗争的故事。</p>',
    '',
    1001,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000002'),
    '国乒有多内卷？陈梦晒晨跑照，秀马甲线！球迷：伊藤美诚赢不了她',
    '<p>中国国乒有多内卷？</p><p>五一劳动节期间，在所有人都在放假的时候，国乒运动员陈梦晒出晨跑相片，秀马甲线。</p><p>与孙颖莎、王曼昱相比，陈梦的相片更加炫酷，更加吸引人。</p><p>秀马甲线，酷！真是自律的人最光荣。</p><p><img src="/static/image/news-info/202205041940040085902777.jpeg" alt=""></p><p><img src="/static/image/news-info/202205041940124507165157.jpeg" alt=""></p><p>通过社交媒体，陈梦表示：五月的第一天又是这么勤劳，祝大家五一劳动节快乐，劳动人民最光荣。</p>',
    '/static/image/news-info/202205041944527752249119.jpeg',
    1002,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000003'),
    '五四特别策划丨一组海报带你感受青年官兵的热血青春',
    '<p>来源：中国军网</p><p>青春因磨砺而出彩</p><p>人生因奋斗而升华</p><p>又是一年五四青年节</p><p>新时代青年官兵</p><p>在军营的一岗一哨上挥洒汗水</p><p>一职一位中付出艰辛</p><p>在军营绽放青春的力量</p><p>点燃激情燃烧的迷彩色</p><p><img src="/static/image/news-info/202205041946436895190002.jpeg" alt=""></p><p><img src="/static/image/news-info/202205041946493127536916.jpeg" alt=""></p><p><img src="/static/image/news-info/202205041946534707371304.jpeg" alt=""></p>',
    '/static/image/news-info/202205041946383341693994.jpeg',
    1003,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000004'),
    '《笑话》算命',
    '<p>找一个路边摆摊的算命老者算姻缘，老人看了我，暗暗叹了口气，脸色很凝重。我立马紧张起来，问老者为什么叹气，老者不答。我赶紧掏出一百块钱，递给老者。老者推却，说：“此事不能说。”我赶紧又掏出一百，一起递给老者，说：“前辈，没关系，说吧。”老者接过钱，又叹了口气，说：“哎，干了一辈子了，从来没见过长得这么丑的！”</p><p><img src="/static/image/news-info/202205041950267244090573.gif" alt=""/></p>',
    '',
    1004,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000005'),
    '原神2.7版本草系反应上线，刻晴/八重神子加强',
    '<p>虽然原神2.7版本要延期了，但好在mhy已经提前做好了草元素的反应。虽然目前只能从测试服窥见一二，但根据过去的习惯，测试服有的东西，到了正式服不说完全一样，基本上也是八九不离十。作为参考是足够了。</p><p>一、草雷反应上线，刻晴/八重神子加强</p><p><img src="/static/image/news-info/202205041941493003254726.png" alt=""></p><p>草雷反应的名字叫“激化”，没什么需要特别注意的，效果简单粗暴，就俩字“加伤”。增加草系/雷系的伤害。根据之前的消息，草系大多是辅助角色，那么很显然，这个加伤主要是给雷系角色用的。而说到雷系角色，一个刻晴，一个八重神子肯定是绕不开的话题。</p><p><img src="/static/image/news-info/202205041941549752299712.png" alt=""></p><p>要求加强刻晴的声音，已经一年半了，要求加强八重神子的声音，也有两三个月了。但策划不为所动，略有修改都不好说到底是不是加强，而且最后还退回了。不过，等到草元素上线之后，如果按照当前草雷反应实装的话，但凡给雷系加个50%左右的增伤，无论是八重神子还是刻晴，基本上就都抬起来了。</p>',
    '/static/image/news-info/202205041944249099719955.jpeg',
    1005,
    NOW(),
    NOW()
  );
DROP TABLE IF EXISTS remark;
CREATE TABLE remark (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  news_id int NOT NULL,
  user_id int NOT NULL,
  reply_user_id int,
  content LONGTEXT NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO remark
VALUES (NULL, 1, 1, NULL, '1, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 1, 2, NULL, '1, 2, 这是一段评论！', NOW(), NOW()),
  (NULL, 1, 3, NULL, '1, 3, 这是一段评论！', NOW(), NOW()),
  (NULL, 1, 4, NULL, '1, 4, 这是一段评论！', NOW(), NOW()),
  (NULL, 1, 5, NULL, '1, 5, 这是一段评论！', NOW(), NOW()),
  (NULL, 1, 1, 2, '1, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 2, 1, NULL, '2, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 2, 2, NULL, '2, 2, 这是一段评论！', NOW(), NOW()),
  (NULL, 2, 3, NULL, '2, 3, 这是一段评论！', NOW(), NOW()),
  (NULL, 2, 4, NULL, '2, 4, 这是一段评论！', NOW(), NOW()),
  (NULL, 2, 5, NULL, '2, 5, 这是一段评论！', NOW(), NOW()),
  (NULL, 2, 1, 2, '2, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 3, 1, NULL, '3, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 3, 2, NULL, '3, 2, 这是一段评论！', NOW(), NOW()),
  (NULL, 3, 3, NULL, '3, 3, 这是一段评论！', NOW(), NOW()),
  (NULL, 3, 4, NULL, '3, 4, 这是一段评论！', NOW(), NOW()),
  (NULL, 3, 5, NULL, '3, 5, 这是一段评论！', NOW(), NOW()),
  (NULL, 3, 1, 2, '3, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 4, 1, NULL, '4, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 4, 2, NULL, '4, 2, 这是一段评论！', NOW(), NOW()),
  (NULL, 4, 3, NULL, '4, 3, 这是一段评论！', NOW(), NOW()),
  (NULL, 4, 4, NULL, '4, 4, 这是一段评论！', NOW(), NOW()),
  (NULL, 4, 5, NULL, '4, 5, 这是一段评论！', NOW(), NOW()),
  (NULL, 4, 1, 2, '4, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 5, 1, NULL, '5, 1, 这是一段评论！', NOW(), NOW()),
  (NULL, 5, 2, NULL, '5, 2, 这是一段评论！', NOW(), NOW()),
  (NULL, 5, 3, NULL, '5, 3, 这是一段评论！', NOW(), NOW()),
  (NULL, 5, 4, NULL, '5, 4, 这是一段评论！', NOW(), NOW()),
  (NULL, 5, 5, NULL, '5, 5, 这是一段评论！', NOW(), NOW()),
  (NULL, 5, 1, 2, '5, 1, 这是一段评论！', NOW(), NOW());
DROP TABLE IF EXISTS message;
CREATE TABLE message (
  id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  news_id int NOT NULL,
  user_id int NOT NULL,
  reply_user_id int,
  content LONGTEXT NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
