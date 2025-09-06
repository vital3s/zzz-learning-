import React, { useState, useEffect } from 'react';
import './App.css';

const ZZZLearningPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home-page');
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('');

  // 模拟数据
  const randomUsers = ["数学导师", "科学探索者", "语言学习者", "编程爱好者", "历史研究者", "艺术鉴赏家"];
  const randomTopics = [
    "数学公式解析",
    "学习技巧分享",
    "科学实验记录",
    "编程经验谈",
    "语言学习心得",
    "历史事件分析",
    "艺术作品欣赏",
    "读书笔记分享"
  ];
  const randomContents = [
    "今天我们来学习一个重要的数学公式，这个公式在物理学和工程学中都有广泛应用。",
    "分享一个高效的学习方法，可以帮助你更快地掌握复杂的概念和技能。",
    "刚刚完成了一个有趣的科学实验，记录下整个过程和实验结果。",
    "在学习编程的过程中，我发现了一些很有用的技巧和资源，分享给大家。",
    "语言学习需要坚持和方法，这是我的一些经验和建议。",
    "对某个历史事件进行了深入研究，分享我的分析和见解。",
    "欣赏了一件艺术作品，谈谈我的感受和理解。",
    "最近读了一本很好的书，记录下我的读书笔记和感想。"
  ];

  // 生成随机帖子
  const generateRandomPosts = (count) => {
    const newPosts = [];
    for (let i = 0; i < count; i++) {
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
      const randomContent = randomContents[Math.floor(Math.random() * randomContents.length)];

      newPosts.push({
        id: Date.now() + i,
        user: randomUser,
        topic: randomTopic,
        content: randomContent,
        time: `${Math.floor(Math.random() * 24)}小时前`,
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
        liked: false,
        bookmarked: false
      });
    }
    return newPosts;
  };

  // 初始化帖子数据
  useEffect(() => {
    const initialPosts = generateRandomPosts(5);
    setPosts(initialPosts);
  }, []);

  // 处理点赞
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // 处理收藏
  const handleBookmark = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          bookmarked: !post.bookmarked
        };
      }
      return post;
    }));
  };

  // 发布新帖子
  const handleSubmitPost = () => {
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
      alert('请填写标题和内容！');
      return;
    }

    const newPost = {
      id: Date.now(),
      user: "学习者",
      topic: newPostTitle,
      content: newPostContent,
      time: "刚刚",
      likes: 0,
      comments: 0,
      liked: false,
      bookmarked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTag('');
    setCurrentPage('home-page');
    alert('内容已发布！');
  };

  // 渲染帖子
  const renderPosts = () => {
    return posts.map(post => (
      <div key={post.id} className="post">
        <div className="post-header">
          <div className="user-avatar">{post.user.charAt(0)}</div>
          <div className="user-name">{post.user}</div>
          <div className="post-time">{post.time}</div>
          <div className="post-actions">
            <button className="post-menu-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div className="post-menu">
              <div className="post-menu-item">
                <i className="fas fa-flag"></i> 举报
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          <h3>{post.topic}</h3>
          <p>{post.content}</p>
        </div>
        <div className="post-footer">
          <div 
            className={`post-action ${post.liked ? 'liked' : ''}`} 
            onClick={() => handleLike(post.id)}
          >
            <i className={post.liked ? "fas fa-heart" : "far fa-heart"}></i>
            <span>{post.likes}</span>
          </div>
          <div className="post-action">
            <i className="far fa-comment"></i>
            <span>{post.comments}</span>
          </div>
          <div 
            className={`post-action ${post.bookmarked ? 'bookmarked' : ''}`}
            onClick={() => handleBookmark(post.id)}
          >
            <i className={post.bookmarked ? "fas fa-bookmark" : "far fa-bookmark"}></i>
            <span>收藏</span>
          </div>
        </div>
      </div>
    ));
  };

  // 渲染页面内容
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home-page':
        return (
          <div className="main-content">
            <div>
              <div className="content-section">
                <h2 className="section-title">最新发布</h2>
                <div id="posts-container">
                  {posts.length > 0 ? renderPosts() : <div className="loading">加载中...</div>}
                </div>
              </div>
            </div>

            <div className="sidebar">
              <h3 className="sidebar-title">热门话题</h3>

              <div className="upcoming-class">
                <div className="class-details">
                  <div className="class-name">#数学公式解析</div>
                  <div className="class-teacher">256篇帖子</div>
                </div>
              </div>

              <div className="upcoming-class">
                <div className="class-details">
                  <div className="class-name">#学习技巧分享</div>
                  <div className="class-teacher">189篇帖子</div>
                </div>
              </div>

              <div className="upcoming-class">
                <div className="class-details">
                  <div className="class-name">#科学实验</div>
                  <div className="class-teacher">142篇帖子</div>
                </div>
              </div>

              <div className="upcoming-class">
                <div className="class-details">
                  <div className="class-name">#编程学习</div>
                  <div className="class-teacher">98篇帖子</div>
                </div>
              </div>

              <div className="upcoming-class">
                <div className="class-details">
                  <div className="class-name">#语言学习</div>
                  <div className="class-teacher">76篇帖子</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'post-page':
        return (
          <div className="new-post-page">
            <div className="content-section">
              <h2 className="section-title">发布新内容</h2>
              <div className="post-form">
                <div className="form-group">
                  <label htmlFor="post-title">标题</label>
                  <input 
                    type="text" 
                    id="post-title" 
                    placeholder="输入帖子标题"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="post-content">内容</label>
                  <textarea 
                    id="post-content" 
                    placeholder="分享你的知识或提出问题..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="post-tags">标签</label>
                  <select 
                    id="post-tags"
                    value={newPostTag}
                    onChange={(e) => setNewPostTag(e.target.value)}
                  >
                    <option value="">选择标签（可选）</option>
                    <option value="math">数学</option>
                    <option value="science">科学</option>
                    <option value="language">语言学习</option>
                    <option value="tips">学习技巧</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setCurrentPage('home-page')}
                  >
                    取消
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleSubmitPost}
                  >
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'profile-page':
        return (
          <div className="profile-page">
            <div className="profile-header">
              <div className="profile-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="profile-info">
                <h2>学习者</h2>
                <p>数学与科学爱好者 | 加入于2023年1月</p>
                <div className="profile-stats">
                  <div className="stat">
                    <div className="stat-value">24</div>
                    <div className="stat-label">帖子</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">128</div>
                    <div className="stat-label">粉丝</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">56</div>
                    <div className="stat-label">关注</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-tabs">
                <div className="profile-tab active">我的帖子</div>
                <div className="profile-tab">收藏</div>
                <div className="profile-tab">设置</div>
              </div>

              <div className="tab-content">
                <div id="tab-posts">
                  {posts.filter(post => post.user === "学习者").map(post => (
                    <div key={post.id} className="post">
                      <div className="post-header">
                        <div className="user-avatar">我</div>
                        <div className="user-name">学习者</div>
                        <div className="post-time">{post.time}</div>
                        <div className="post-actions">
                          <button className="post-menu-btn">
                            <i className="fas fa-ellipsis-h"></i>
                          </button>
                          <div className="post-menu">
                            <div className="post-menu-item">
                              <i className="fas fa-edit"></i> 编辑
                            </div>
                            <div className="post-menu-item">
                              <i className="fas fa-trash"></i> 删除
                            </div>
                            <div className="post-menu-item">
                              <i className="fas fa-lock"></i> 设为私密
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="post-content">
                        <p>{post.content}</p>
                      </div>
                      <div className="post-footer">
                        <div className="post-action">
                          <i className="far fa-heart"></i>
                          <span>{post.likes}</span>
                        </div>
                        <div className="post-action">
                          <i className="far fa-comment"></i>
                          <span>{post.comments}</span>
                        </div>
                        <div className="post-action">
                          <i className="far fa-bookmark"></i>
                          <span>收藏</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'booking-page':
        return (
          <div className="content-section">
            <h2 className="section-title">课程预约</h2>
            <p>这里是课程预约页面内容。</p>
          </div>
        );
      
      case 'notes-page':
        return (
          <div className="content-section">
            <h2 className="section-title">学习笔记</h2>
            <p>这里是学习笔记页面内容。</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          <div className="logo">
            <img src="https://placehold.co/100x100/ff7700/white?text=ZZZ" alt="ZZZ Logo" id="site-logo" />
          </div>
          <div className="brand-name">ZZZ学习平台</div>
        </div>

        <nav>
          <ul>
            <li>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'home-page' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('home-page');
                }}
              >
                首页
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'post-page' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('post-page');
                }}
              >
                发布
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'booking-page' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('booking-page');
                }}
              >
                课程
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'notes-page' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('notes-page');
                }}
              >
                笔记
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link ${currentPage === 'profile-page' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('profile-page');
                }}
              >
                我的
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {renderPageContent()}

      <footer>
        <p>© 2023 ZZZ学习平台 - 知识分享与交流社区</p>
      </footer>
    </div>
  );
};

export default ZZZLearningPlatform;
