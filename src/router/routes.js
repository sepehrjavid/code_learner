const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {path: 'home', name: "DashboardHome", component: () => import('pages/DashboardHome.vue')},
      {path: 'editProfile', name: "EditProfile", component: () => import('pages/EditProfile.vue')},
      {path: 'changePassword', name: "ChangePassword", component: () => import('pages/ChangePassword.vue')},
      {path: 'manageQuiz', name: "ManageQuiz", props: true, component: () => import('pages/QuizManagement.vue')},
      {path: 'quiz', name: "Quiz", props: true, component: () => import('pages/Quiz.vue')},
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: "Home", component: () => import('pages/Index.vue')},
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
