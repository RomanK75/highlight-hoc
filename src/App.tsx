import React, { useState,PropsWithChildren } from 'react';


type data = {
  type: string;
  url?: string;
  views: number;
  title?: string;
}


const withWrapper = (Component: React.ComponentType<data>)=> {
  return (props: data) => {
    if (props.views > 1000) {
      return <Popular><Component  {...props}/></Popular>
    }
    else if (props.views < 100) {
      return <New><Component  {...props}/></New>
    }
    else {
      return <Component {...props} />
    }
  }
}

const WrappedArticle = withWrapper(Article)
const WrappedVideo = withWrapper(Video)


function New(props: PropsWithChildren) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: PropsWithChildren) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props:data) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: data) {
    return (
        <div className="item item-video">
            <iframe src={props.url}  allow="autoplay; encrypted-media; fullscreen"></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};


function List(props:{list:data[]}) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <WrappedVideo {...item} />
                  );
                  
                  case 'article':
                    return (
                    <WrappedArticle {...item} />

                );
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}