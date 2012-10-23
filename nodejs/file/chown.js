/**
 *	chmod 改变文件的拥有者和用户组
 *  
 *  详情 man 2 chmod
 *  在传统的 bsd 下，c语言函数是这样的
 *  
 *  int chown(const char *path, uid_t owner, gid_t group)
 *  int fchown(int fildes, uid_t owner, gid_t group)
 *  int lchown(const char *path, uid_t owner, gid_t group
 *
 *  在 nodejs 的 api 中使用要简单一点
 *  显然nodejs中默认的处理都是以异步的方式进行，但是用户可以选择一同步的方式调用api
 *  知识后面加了Sync关键字而已，同步方法的用法和c语言函数的用法相同。好吧，我暂时还
 *  不知道怎么获取uid和gid
 *  fs.chown(path, uid, gid, [callback])
 *  fs.chownSync(path, uid, gid)
 *  fs.fchown(fd, uid, gid, [callback])
 *  fs.fchownSync(fd, uid, gid)
 *  fs.lchown(path, uid, gid, [callback])
 *  fs.lchownSync(path, uid, gid)
 */