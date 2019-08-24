# API 

## info
format:{$path}/{$info}
ip:'114.116.32.137'
port:'8888'


##hot
固定条数的热门推荐，根据收藏来决定或anyway
//书
//电影
//评论的热门


## book
返回固定条数的书籍信息，0则all
/book
{
	count:$limit
	start:$startIndex
}

返回指定title的详情信息
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

## movie
返回固定条数的电影信息，0则all
/movie
{
	count:$limit
	start:$startIndex
}


返回指定ititle的详情信息
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

## review
返回固定条数的指定电影/书籍评论信息，0则all
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


## search
关键词匹配搜索
/search
{
	title:$title
	count:$count
	start:$startIndex
}


