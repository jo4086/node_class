

```
# [page: 1, limit: 3, offset: 0]: offst의 갯수만큼 레코드를 건너 뛰고 최신 레코드를 가져옴.
select * from posts order by createAt desc limit 3 offset 0

# page: 2, limit: 3, offset: 3
select * from posts order by createAt desc limit 3 offset 3

# page: 3, limit: 3, offset: 3
select * from posts order by createAT desc limit 3 offset 6
```