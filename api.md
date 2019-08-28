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
```
//get	返回固定条数的书籍信息，0则all
/book
{
	count:$limit
	start:$startIndex
}

```

```
//get 	返回指定title的详情信息
/onebogokbykey
{
	title:$title
}
//get 	返回多条指定title的详情信息
/booksbykey
{
	title:$title
	count:$count
	start:$startIndex
}
//post 获取新的bid
/getnewbid
```
## movie
```
//get	返回固定条数的电影信息，0则all
/movie
{
	count:$limit
	start:$startIndex
}
//get	返回指定ititle的详情信息
/onemoviebykey
{
	title:$title
}
//get	//get	返回指定ititle的详情信息
/moviesbykey
{
	title:$title
	count:$count
	start:$startIndex
}

//post 获取新的mid
/getnewmid
```

## review
```
//get	返回固定条数的指定电影/书籍评论信息，0则all
/bookreview
{
	title:$title
	count:$count
	start:$startIndex
}
//post	对书本添加新的书评
/addmoviereview
{
	mid：	//movieid
	review:{
      "rating" : {    
        "value" : 5.0,
      },
      "useful_count" : 13251,
      "author" : {
        "id" : "1041052",
        "name" : "犀牛"
      },
      "content" : "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。每当现实令我疲惫得产生无力感，翻出这张碟，就重获力量。毫无疑问，本片位列男人必看的电影前三名！回顾那一段经典台词：“有的人的羽翼是如此光辉，即使世界上最黑暗的牢狱，也无法长久地将他围困！”",
      "created_at" : "2005-10-28 00:28:07",
    }
}

//get	返回固定条数的指定电影/书籍评论信息，0则all
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
//get	返回固定条数和页数的指定关键字title的所有信息，包含书、电影、小组、讨论，按照相关度排序
/search
{
	title:$title
	count:$count
	start:$startIndex
}
//get	返回固定条数和页数的指定关键字电影title的所有信息
/search/movie
{
	title:$title
	count:$count
	start:$startIndex
}
//get	返回固定条数和页数的指定关键字书籍title的所有信息
/search/book
{         
	title:$title
	count:$count
	start:$startIndex
}
//get	返回固定条数和页数的指定关键字小组title的所有信息
/search/group
{
	title:$title
	count:$count
	start:$startIndex
}
//get	返回固定条数和页数的指定关键字讨论title的所有信息
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
//post 增加一个新的小组
/addgroup
{
    uid:
	username：
	userheadimg：
    groupmsg:{
        groupname:
        grouphead:
        gid: 
        text:      //小组信息，界面里小组名下面的部分                                   
    }
}                            
//post 在all maxgid中获取然后++
/getnewgid
```
### group admin
//此处需要与前端一起测试，先跳过
```
/delgroup{
	uid:$
    gid:$
}
/deltopic{
	uid:$
    gid:$
    tid:$
}
```

### group user
```
//post  加入小组
joingroup      
{
    gid:$
	user:{
		username：$
		userheadimg：$
		uid:$
	}
	
}
//post  退出小组
quitgroup
{
    uid:$
    gid:$
}
//get 返回用户所在所有小组id
/usergroup
{
    uid:$
}
//get 查询所给uid是否属于所给gid的小组 请判断是否为true
isuserofgroup{
{
    uid:$
    gid:$
}
//get 返回是否该uid能够管理gid  请判断是否为true
isadminofgroup
{
    uid:$
    gid:$
}
```

### topic
```
//get  添加topic
/topic/addtopic{
    gid:$
    uid:
    userheadimg:
    username:
    tid:
    title:
    text:
} 
//get 数据库返回一个无重复的id，原理是group里有个maxtid，return maxtid++
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
//get 添加topic 的 review
/topic/addreview
{
    tid:
    review{
    uid:
    text:
    userheadimg:
    username:
    }
}
//get 添加review的review
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
//post 置顶帖子
 /topic/totop
 {
     tid:
     uid:
     gid:
 }
 //post 加精帖子
 /topic/togood
 {
     tid:
     uid:
     gid:
 }
//post 取消置顶帖子
/topic/nottop
{
    tid:
    uid:
    gid:
}
//post 取消加精帖子
/topic/notgood
{
    tid:
    uid:
    gid:
}
```

## user
```
//post 新用户注册获得新的id
/user/getnewuid
//post 用户收藏一本书
/user/likebook{
    bid:
    uid:
}
//post 用户收藏一个电影
/user/likemovie
{
    mid:
    uid:
}
//post 查询所给uid是否收藏了这本书 请判断是否为true
/user/isuserlikebook
{
    bid:
    uid:
}
//post 查询所给uid是否收藏了这个电影 请判断是否为true
/user/isuserlikemovie
{
    mid:
    uid:
}
//post 用户取消收藏一个电影
/user/unlikebook
{
    bid:
    uid:
}
//post 用户取消收藏一个电影
/user/unlikemovie
{
    mid:
    uid:
}
```