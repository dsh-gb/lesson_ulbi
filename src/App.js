import React, { useRef, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: "JS", body: "JavaScript" },
    { id: 2, title: "C", body: "lang prog C" },
    { id: 3, title: "C++", body: "lang prog C++" },
  ]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function getSortedPosts() {
    console.log('work func getSortedPosts');
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }
  const sortedPosts = getSortedPosts();

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  // const bodyInputRef = useRef();
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className="App">
      {/* неуправляемый компонент - доступ через DOM дерево посредством useRef*/}
      {/* <MyInput
          ref={bodyInputRef}
          type="text"
          placeholder="Описание поста"
        /> */}
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={'Поиск...'}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          options={[
            {
              value: 'title',
              name: 'По названию'
            },
            {
              value: 'body',
              name: 'По содержимому'
            }]}
          defaultValue='Сортировка по'
        />
      </div>
      {posts.length
        ?
        <PostList remove={removePost} posts={sortedPosts} title="Список постов" />
        :
        <h1 style={{ textAlign: 'center' }}>Постов нету</h1>
      }

    </div>

  );
}

export default App;
