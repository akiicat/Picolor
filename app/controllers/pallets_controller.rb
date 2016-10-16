class PalletsController < ApplicationController
  layout 'pallet'

  before_action :set_pallet, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_painter!

  # GET /pallets
  # GET /pallets.json
  def index
    @pallets = Pallet.all
  end

  # GET /pallets/1
  # GET /pallets/1.json
  def show
  end

  # GET /pallets/new
  def new
    @pallet = Pallet.new
  end

  # GET /pallets/1/edit
  def edit
  end

  # POST /pallets
  # POST /pallets.json
  def create
    @pallet = Pallet.new()
    @pallet.painter_id    = current_painter.id
    @pallet.title         = 'Untitle'
    @pallet.description   = ''
    @pallet.colors_count  = 5
    @pallet.colors        = '#223c4e #2e879e #5fcc86 #b3e878 #e5ff87'

    respond_to do |format|
      if @pallet.save
        format.html { redirect_to edit_pallet_path(@pallet), notice: 'Pallet was successfully created.' }
        format.json { render :show, status: :created, location: @pallet }
      else
        format.html { render :new }
        format.json { render json: @pallet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pallets/1
  # PATCH/PUT /pallets/1.json
  def update
    respond_to do |format|
      if @pallet.update(pallet_params)
        format.html { redirect_to @pallet, notice: 'Pallet was successfully updated.' }
        format.json { render :show, status: :ok, location: @pallet }
      else
        format.html { render :edit }
        format.json { render json: @pallet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pallets/1
  # DELETE /pallets/1.json
  def destroy
    @pallet.destroy
    respond_to do |format|
      format.html { redirect_to pallets_url, notice: 'Pallet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pallet
      @pallet = Pallet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pallet_params
      params.require(:pallet).permit(:title, :image_url, :description, :colors_count, :colors)
    end
end
