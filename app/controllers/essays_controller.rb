class EssaysController < ApplicationController
  
  def index
    render json: Essay.all
  end
  def show
    essay=Essay.find(params[:id])

    render json: essay, status: :ok
  end


  def unreviewed
    render json: @current_user.essays.where(is_reviewed: nil ), status: :ok 
  end

  def reviewed
    render json: @current_user.essays.where(is_reviewed:true), serializer: EssaysSerializer, status: :ok 
  end

  def reviewable
    unreviewed_essays=Essay.all.where(is_reviewed: nil)
    render json: unreviewed_essays.where.not(user_id:@current_user.id).sample(5), status: :ok
  end

  def current
    render json: Essay.find(params[:id])
  end



  def create
    essay = @current_user.essays.create!(essay_params)

    render json: essay, status: :created
  end

  def submit_review
    essay=Essay.find(params[:id])
    essay.update(essay_review_params)
    essay.update(reviewer_id: @current_user.id)
    render json: essay

  end

  def destroy
  essay=Essay.find(params[:id])
  essay.destroy
  head :no_content
  end
  private

  def essay_params
    params.permit(:content, :prompt, :length)
  end

  def essay_review_params
    params.permit(:overall_comments,:flow_comments,:tone_comments, :is_reviewed)
  end
end