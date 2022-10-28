Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create,:show]
  resources :essays, only: [:index,:create, :show, :destroy]
  get "/me", to: "users#show"
  get "/current-essay/:id", to: "essays#current"
  get "/essays-reviewed", to: "essays#reviewed"
  get "/essays-unreviewed", to: "essays#unreviewed"
  get "/essays-reviewable", to: "essays#reviewable"
  get "/show_points", to: "users#show_points"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  patch "/finish-review/:id", to: "essays#submit_review"
  patch "/submit-essay/:length", to: "users#submit_essay"
  patch "/submit-review/:length", to: "users#submit_review"
  delete "/logout", to: "sessions#destroy"
  
  # Defines the root path route ("/")
  # root "articles#index"
end
