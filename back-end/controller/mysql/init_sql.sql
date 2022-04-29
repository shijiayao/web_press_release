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
    0,
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
    '/image/friend-links/20220429204133393.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '简书',
    'https://www.jianshu.com',
    '/image/friend-links/20220429210213955.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '百度搜索',
    'https://www.baidu.com',
    '/image/friend-links/20220429204334543.png',
    NOW(),
    NOW()
  ),
  (
    NULL,
    '百度翻译',
    'https://fanyi.baidu.com',
    '/image/friend-links/20220429204355252.png',
    NOW(),
    NOW()
  )
