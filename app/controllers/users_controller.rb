class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user=User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  def show_points
    render json: @current_user.points
  end

  def submit_essay
    if (@current_user.points < params[:length].to_i)
      render json: {error: "You Don't Have Enough Points!"}, status: :unprocessable_entity
    else
      @current_user.update(points: @current_user.points-params[:length].to_i)
      render json: @current_user
    end
    
  end

  def submit_review
    @current_user.update(points: @current_user.points+params[:length].to_i)
    render json: @current_user
  end
  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end

end