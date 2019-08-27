# API 

## info
format:{$path}/{$info}
ip:''
port:'8888'


##hot
固定条数的热门推荐，根据收藏来决定或anyway
//书
//电影
//评论的热门


## book
返回固定条数的书籍信息，0则all
```
/book
{
	count:$limit
	start:$startIndex
}

```
返回指定title的详情信息
```
/onebookbykey
{
	title:$title
}
/booksbykey
{
	title:$title
	count:$count
	start:$startIndex
}
```
## movie
返回固定条数的电影信息，0则all
```
/movie
{
	count:$limit
	start:$startIndex
}

```
返回指定ititle的详情信息
```
/onemoviebykey
{
	title:$title
}
/moviesbykey
{
	title:$title
	count:$count
	start:$startIndex
}
```

## review
返回固定条数的指定电影/书籍评论信息，0则all
```
/bookreview
{
	title:$title
	count:$count
	start:$startIndex
}
/moviereview
{
	title:$title
	count:$count
	start:$startIndex
}
```

## search
关键词匹配搜索

```
/search
{
	title:$title
	count:$count
	start:$startIndex
}
/search/movie
{
	title:$title
	count:$count
	start:$startIndex
}
/search/book
{                                                                                                                                                                                                                 vvvv你你你你你女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女女vvvvvvvvvvvvvv                                                                                                                                                                                                                                                                                                                           
	title:$title
	count:$count
	start:$startIndex
}
/search/group
{
	title:$title
	count:$count
	start:$startIndex
}
/search/topic
{
	title:$title
	count:$count
	start:$startIndex
}

```
## group
### 小组的增删
```
//增加小组
//数据库中需要在user和group双向加
/addgroup
{
    uid:
    groupmsg:{
        groupname:
        grouphead:
        gid: 
        text:      //小组信息，界面里小组名下面的部分                                   
    }
}                            
// 在all maxgid中获取然后++  post
/getnewgip
```
### group admin
```
/delgroup{
    gid:$
}
/deltopic{
    gid:$
    tid:$
}
```

### group user
```
//加入小组
jiongroup{      
{
    uid:$
    gid:$
}
return ok,no
//退出小组
quitgroup
{
    uid:$
    gid:$
}
//返回用户所在所有小组id
/usergroup
{
    uid:$
}
//查询所给uid是否属于所给gid的小组
isuserofgroup{
{
    uid:$
    gid:$
}
//返回是否该uid能够管理gid
isadminofgroup
{
    uid:$
    gid:$
}
```

### topic
```
//添加topic
/topic/addtopic{
    gid:$
    uid:
    userheadimg:
    username:
    topicmsg:{
        tid:
        createTime
        title:
        text:
    }
} 
//数据库返回一个无重复的id，原理是group里有个maxtid，return maxtid++
/topic/getnewtid
 {
    gid:
}
retuen tid
```
//以下给数据库看
```
topicmsg:{
        tid:
        createtime:
        title:
        text:
        username:
        gid:
        uid:
        userheadimg:
        review:[
        {
        uid:
        text:
        title:
        userheadimg:
        username:
        createtime:
        review:[{
        uid:
        username:
        text:
        },]
        },]
}
```
```
/topic/addreview
{
    gid:
    tid:
    review{
    uid:
    text:
    title:
    userheadimg:
    username:
    createtime:
    }
}
/topic/addreviewsreview
{
    gid:
    tid:
    reviewindex:        //review在该topic下的reviews里的index
    reviewmsg:{
        uid:
        username:
        text:
    }  
}
```

## user
//新用户注册获得新的id
/getnewuid
