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
    '/image/friend-links/202205011601430400017377.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '简书',
    'https://www.jianshu.com',
    '/image/friend-links/202205011601501120121281.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '百度搜索',
    'https://www.baidu.com',
    '/image/friend-links/202205011601547004626985.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '百度翻译',
    'https://fanyi.baidu.com',
    '/image/friend-links/202205011602002970363700.png',
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
    '《闯关东》原班人马再携手，彰显英雄气概和爱国情怀',
    '由高满堂、黄宏任总编剧，张新建任总导演，巩峥、宋佳伦、李乃文、王媛可、萨日娜等主演的年代传奇剧《运河风流》，于4月29日19：30在北京卫视开播。\n《运河风流》从民国初期黄、宋两家争祭河神庙事件讲起，跨越近三十年风云际会的历史变迁，以“济宁三杰”三大家族的故事串起诸多人物的爱情、亲情、友情，描述了运河沿岸的华夏儿女最为真实的生活状态与宗族结构。剧中，既有运河沿岸红红火火的繁荣景象，也有“铁路兴、运河荒”的哀叹，在时代的洪流中，有人迷失自我，有人坚守信念，有人随波逐流，有人舍生忘死。透过《运河风流》，观众可以看到济宁漕运地区三大家族的兴衰沉浮，还有他们的子孙后代在运河沿岸进行不屈不挠的抗日革命斗争的故事。',
    '',
    1001,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000002'),
    '恭喜！女排国手张常宁与男篮国手吴冠希婚纱照出炉 将在6月办婚礼',
    '北京时间4月29日，中国女排国手张常宁通过社媒“官宣”，她与中国男篮国手吴冠希的婚纱照出炉，两人拍摄了一组时尚靓丽的婚纱照，而他们将在今年6月份举办婚礼。\n中国体坛有不少神仙眷侣，诸如姚明与叶莉，林丹与谢杏芳等。至于张常宁与吴冠希则是又一对神仙眷侣，尤其是张常宁是中国女排公认的美女，而吴冠希也是中国篮坛的绝对帅哥，如此组合也是被网友誉为“金童玉女”。',
    '',
    1002,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000003'),
    '长十一发射成功，我国首次实现运载火箭海上“一站式”发射',
    '4月30日11时30分，长征十一号运载火箭在我国黄海南部海域，以“一箭五星”方式托举吉林一号高分系列卫星点火升空，随后卫星被顺利送入预定轨道，发射取得圆满成功。\n长征十一号运载火箭由中国航天科技集团有限公司一院研制，主要用于太阳同步轨道和近地轨道载荷发射任务，支持单星发射、多星发射、星座快速组网和补网发射\n截至目前，长征十一号运载火箭共进行13次发射任务，其中10次为陆上发射，3次海上发射，共计将58颗卫星送入太空。今年还将有1~3次海上发射计划，包括低倾角圆轨道和太阳同步轨道。\n本次任务中，长征十一号运载火箭在一院固体运载火箭产业基地完成总装总测，随即转运至港口发射船完成发射准备并出海执行任务，首次实现了火箭总装、总测、出港、发射的一体化，任务周期缩短三分之一，同时减少运输成本及运输过程可能产生的风险，为后续海上高频次、批量化发射奠定了扎实的基础。\n长征十一号运载火箭在此次任务中进行了以一级更换新型伺服机构为代表的多项技术改进，提高了火箭的测试覆盖性和可维护性，发射操作更为简捷。本次发射船航程超550公里，进一步拓展了海射的机动范围，提高任务适应性。\n吉林一号高分03D04星~07星及高分04A星共包含5颗卫星，是由长光卫星技术股份有限公司出资自研的光学遥感技术卫星，主要用于获取高分辨可见光推扫影像和视频影像。5颗卫星与在轨的吉林一号卫星组网后，将为林业、农业、草原、海洋、资源、环境、城市建设等行业用户提供更加丰富的遥感数据和产品服务。\n本次发射是长征系列运载火箭第418次发射。',
    '',
    1003,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000004'),
    '《笑话》算命',
    '找一个路边摆摊的算命老者算姻缘，老人看了我，暗暗叹了口气，脸色很凝重。我立马紧张起来，问老者为什么叹气，老者不答。我赶紧掏出一百块钱，递给老者。老者推却，说：“此事不能说。”我赶紧又掏出一百，一起递给老者，说：“前辈，没关系，说吧。”老者接过钱，又叹了口气，说：“哎，干了一辈子了，从来没见过长得这么丑的！”',
    '',
    1004,
    NOW(),
    NOW()
  ),
  (
    NULL,
    CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), '0000000005'),
    '《原神》神里绫人和公子看起来很像，但根本不一样',
    '原神但凡只要有新的水C上限，一路充满争议的公子不免又会被拉出来比较，只是这一次，是一个外表定位看似都相似的水C，几个月来节奏四起，各种相信绫人是公子的上位替代、绫人将会取代公子的言论。\n神里凌人这个角色虽然定位看似跟公子没什么两样，但其实各有优缺点，并没有什么凌人可以完全取代公子的说法。公子0命就能当主C，如果说是想抽凌人当C位的人，必须考虑直奔一到四命。我个人一直认为，公子毕竟在深渊使用率一直不高，做出一个取代他的角色，对米哈游来说，真的没有什么好处。神里绫人和公子看起来很像，但根本完全不一样。对于公子玩家和非公子玩家，绫人的评价和测试可以说有些看起来是完全相反的，但这并不是客观或者不客观的问题，而是出在操作和出发点的不同。\n神里绫人操作简单，只要按着a控制方向，同时有霸体，能抗打断，达达利亚操作困难，以弓手之姿打近战，韧质时常过低容易被击飞。吃拐能力上，绫人只能吃到一点点或吃不到反应类型，只能吃到增伤，可以看做是一个打蓝字的物理角色。公子则是全游戏的吃拐天花板，占水属优势，靠着吃辅助和反应跟上版本强度的角色。对怪能力上，绫人对群小范围AOE，在普攻时范围较大，能触及较远，对单短时间高倍率伤害，清怪非常快速。公子断流对群特化，怪越多指数型增伤，对单较为疲乏。\n许多主玩公子的玩家就直接把公子的圣遗物脱给绫人，然后直接把配队中的公子的位置取代成绫人，比方万达国际直接改万绫双火，会发现丢失很多dps手法也不自由，然后说不如公子。习惯公子的人，站在水就是要吃拐的出发点去玩绫人，就觉得弹性好低手好固定吃拐都吃不满大招浪费2秒好难用。非主玩公子的玩家则用绫人和公子去打各种单体王，然后用一些增伤拐增益(不知道为何都不用万达)，测试后绫人的秒数都比较低，加上本来就没办法习惯公子的人，可以理解为他们就是没有办法适应公子的操作所以觉得公子很难用，会觉得绫人实在太好用了，得出公子不如绫人的结论。\n根本的问题就是，通通站在另一个角色的优势和出发点去测试另一个角色，他们本质上就是不一样的也没有什么可比性的。总的来看，正如剧情里的那样，神里绫人向来无意纷争，但纷争还是找上了他。他看似平易近人，但当你想深入时却找不到对策，他全能，只为平民初学玩家也能享受战斗。他不追求固化的手法和队友，只要能达成通关的目的。他是神里家家主，爱喝珍奶的神里绫人。',
    '',
    1005,
    NOW(),
    NOW()
  )
