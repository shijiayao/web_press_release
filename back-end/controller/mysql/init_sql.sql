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
  create_time TIMESTAMP NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO user
VALUES (
    0,
    9000,
    'admin',
    MD5('123456'),
    'admin',
    'admin@email.com',
    '18812345678',
    '管理员',
    0,
    NOW()
  ),
  (
    0,
    7000,
    'test-admin-01',
    MD5('123456'),
    'test-admin-01',
    'test-admin-01@email.com',
    '18800001111',
    '测试管理员01',
    0,
    NOW()
  ),
  (
    0,
    7000,
    'test-admin-02',
    MD5('123456'),
    'test-admin-02',
    'test-admin-02@email.com',
    '18800002222',
    '测试管理员02',
    1,
    NOW()
  ),
  (
    0,
    2000,
    'test-01',
    MD5('123456'),
    'test-01',
    'test-01@email.com',
    '18822221111',
    '普通用户01',
    0,
    NOW()
  ),
  (
    0,
    2000,
    'test-02',
    MD5('123456'),
    'test-02',
    'test-02@email.com',
    '18822222222',
    '普通用户02',
    1,
    NOW()
  );
