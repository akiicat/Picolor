class HomeController < ApplicationController
  #layout 'pallet'

  # before_action :set_pallet, only: [:show, :edit, :update, :destroy]
  # before_action :authenticate_painter!, except: [:show, :edit]

  # GET /pallets
  # GET /pallets.json
  def index
    @pallets = Pallet.all.order(created_at: :desc).limit(30)
  end
end
