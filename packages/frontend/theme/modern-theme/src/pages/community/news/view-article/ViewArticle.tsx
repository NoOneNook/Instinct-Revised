import {useRoute} from 'wouter';
import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {RecentNews} from './recent-news/RecentNews';
import {UserLayout} from '../../../../components/layout/user';
import {Loading, setURL, useFetchArticleByID} from '@instinct-web/core';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
} from '@material-ui/core';
import {ViewComments} from './view-comments/ViewComments';

setURL('community/news/:articleID', <ViewArticle />);

export function ViewArticle() {
  const [refresh, setRefresh] = useState(0);
  const [match, params] = useRoute<{articleID: string}>(
    '/community/news/:articleID'
  );
  const article = useFetchArticleByID(params!.articleID, refresh);

  return (
    <UserLayout>
      <Loading isLoading={false}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Card style={{background: '#272B34', color: 'white'}}>
              <CardHeader
                title={article?.title}
                subheader={
                  <span style={{color: 'rgb(73, 80, 87)'}}>
                    {article?.description}
                  </span>
                }
              />
              <CardMedia image={article?.headerImage} style={{height: 300}} />
              <CardContent>
                <ReactMarkdown source={article?.content ?? ''} />
              </CardContent>
              <CardActions>
                <Button color="primary" variant="text">
                  Like (1)
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <RecentNews />
            <div style={{marginTop: '2.5%'}}>
              <ViewComments
                article={article}
                onChange={() => setRefresh(_ => _ + 1)}
              />
            </div>
          </Grid>
        </Grid>
      </Loading>
    </UserLayout>
  );
}
