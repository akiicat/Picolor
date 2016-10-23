class PalletsController < ApplicationController
  layout 'pallet'

  before_action :set_pallet, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_painter!, except: [:show, :edit]

  # GET /pallets
  # GET /pallets.json
  def index
    @pallets = Pallet.where(:painter_id => current_painter).order(updated_at: :desc)
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

    if params[:fork_id]
      pallet = Pallet.find(params[:fork_id])
      @pallet.image_url   = pallet.image_url
      @pallet.colors      = pallet.colors
    else
      @pallet.image_url   = '[]'
      @pallet.colors      = generate_colors(5).join(',')
    end

    @pallet.painter_id    = current_painter.id
    @pallet.title         = 'Untitled'

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
    args = pallet_params
    images = JSON.parse(args[:image_url])
    colors = args[:colors].split(',')
    args[:title] = 'Untitled' if args[:title].empty?
    args[:image_url] = images[0..4].to_json if images.count > 5
    args[:colors] = (colors + generate_colors(5 - colors.count)).join(',') if colors.count < 5
    args[:colors] = colors[0..31].join(',') if colors.count > 32

    respond_to do |format|
      if current_painter.id == @pallet.painter_id and @pallet.update(args)
        format.html { redirect_to @pallet, notice: 'Pallet was successfully updated.' }
        format.js {}# render json: @pallet, status: :ok }
        format.json { render :show, status: :ok, location: @pallet }
      else
        format.html { render :edit }
        format.js { render json: @pallet.colors, status: :error }
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

    def generate_colors(number = 5)
      rtn = Array.new
      number.times { rtn.push('#' + SecureRandom.hex[0..5]) }
      return rtn
    end
end
