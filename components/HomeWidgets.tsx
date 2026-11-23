import React, { useState } from 'react';
import { Bus, Plane, Building2, Search, MapPin, Calendar, Tag, Copy, Star, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { SearchMode, VehicleType } from '../types';
import { CITIES } from '../lib/mockData';

interface SearchHeroProps {
  onSearch: (mode: SearchMode, criteria: any) => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ onSearch }) => {
  const [mode, setMode] = useState<SearchMode>('transport');
  
  // Transport State
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  // Hotel State
  const [hotelCity, setHotelCity] = useState('');
  const [checkIn, setCheckIn] = useState('');

  const handleSearchClick = () => {
    if (mode === 'transport') {
      onSearch('transport', { from, to, date, type, timeRange });
    } else {
      onSearch('hotel', { city: hotelCity, checkIn });
    }
  };

  return (
    <div className="relative bg-slate-900 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={mode === 'transport' 
            ? "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          }
          alt="Travel background" 
          className="w-full h-full object-cover opacity-40 scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            {mode === 'transport' ? 'Vi vu muôn nơi' : 'Nghỉ dưỡng tuyệt vời'} <br/> 
            <span className="text-blue-400">{mode === 'transport' ? 'Cùng TravelVN' : 'Tại khách sạn đẳng cấp'}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 drop-shadow-sm">
            {mode === 'transport' 
              ? 'Đặt vé xe khách, xe bus và máy bay nhanh chóng với mạng lưới rộng khắp.' 
              : 'Hàng ngàn khách sạn, resort giá tốt đang chờ đón bạn.'}
          </p>
        </div>

        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
          
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-slate-200 pb-2">
            <button 
              onClick={() => setMode('transport')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${mode === 'transport' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Bus className="h-5 w-5" /> Vé xe & Máy bay
            </button>
            <button 
              onClick={() => setMode('hotel')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${mode === 'hotel' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Building2 className="h-5 w-5" /> Khách sạn
            </button>
          </div>

          {mode === 'transport' ? (
            /* TRANSPORT FORM */
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Điểm đi</label>
                  <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                    <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                    <select 
                      className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    >
                      <option value="">Chọn nơi đi</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Điểm đến</label>
                  <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                    <MapPin className="h-5 w-5 text-red-500 mr-2" />
                    <select 
                      className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    >
                      <option value="">Chọn nơi đến</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Ngày đi</label>
                  <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                    <Calendar className="h-5 w-5 text-slate-400 mr-2" />
                    <input 
                      type="date" 
                      className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Phương tiện</label>
                  <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                    <Bus className="h-5 w-5 text-indigo-500 mr-2" />
                    <select 
                      className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="all">Tất cả phương tiện</option>
                      <option value={VehicleType.BUS}>{VehicleType.BUS}</option>
                      <option value={VehicleType.COACH}>{VehicleType.COACH}</option>
                      <option value={VehicleType.PLANE}>{VehicleType.PLANE}</option>
                    </select>
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Giờ khởi hành</label>
                  <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                    <Clock className="h-5 w-5 text-orange-500 mr-2" />
                    <select 
                      className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option value="all">Tất cả khung giờ</option>
                      <option value="00:00-06:00">Sáng sớm (00:00 - 06:00)</option>
                      <option value="06:00-12:00">Buổi sáng (06:00 - 12:00)</option>
                      <option value="12:00-18:00">Buổi chiều (12:00 - 18:00)</option>
                      <option value="18:00-23:59">Buổi tối (18:00 - 24:00)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={handleSearchClick}
                    className="w-full h-[50px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center justify-center transition shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-95"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Tìm kiếm ngay
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* HOTEL FORM */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative group">
                <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Điểm đến / Thành phố</label>
                <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <select 
                    className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                  >
                    <option value="">Chọn thành phố</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="relative group">
                <label className="text-xs font-bold text-slate-500 mb-1 block uppercase tracking-wide">Ngày nhận phòng</label>
                <div className="flex items-center bg-slate-50 rounded-xl p-3 border border-slate-200 group-focus-within:ring-2 ring-blue-500 transition">
                  <Calendar className="h-5 w-5 text-slate-400 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full text-slate-800 font-semibold focus:outline-none cursor-pointer"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleSearchClick}
                  className="w-full h-[50px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center justify-center transition shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-95"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Tìm khách sạn
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PromotionProps {
  onCopy: (code: string) => void;
  savedPromos: string[];
}

export const PromotionSection: React.FC<PromotionProps> = ({ onCopy, savedPromos }) => (
  <div className="py-12">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Tag className="h-6 w-6 text-red-500" />
        Ưu đãi nổi bật
      </h2>
      <a href="#" className="text-blue-600 font-medium hover:underline text-sm">Xem tất cả</a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Giảm 20% vé máy bay', code: 'FLY20', color: 'bg-blue-500' },
        { title: 'Giảm 50k vé xe khách', code: 'BUS50', color: 'bg-orange-500' },
        { title: 'Combo Khách sạn Hè', code: 'HOTEL2024', color: 'bg-purple-500' }
      ].map((promo, i) => {
        const isSaved = savedPromos.includes(promo.code);
        return (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition">
           <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${promo.color} transition-transform group-hover:scale-110`}></div>
           <h3 className="text-lg font-bold text-slate-800 mb-1">{promo.title}</h3>
           <p className="text-sm text-slate-500 mb-4">Áp dụng cho mọi hành trình trong tháng này.</p>
           <div className="flex items-center gap-2">
             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-mono font-bold border border-slate-200 border-dashed">
               {promo.code}
             </span>
             <button 
              onClick={() => !isSaved && onCopy(promo.code)}
              disabled={isSaved}
              className={`text-xs font-bold flex items-center gap-1 ${isSaved ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
             >
               {isSaved ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
               {isSaved ? 'Đã lưu' : 'Lưu mã'}
             </button>
           </div>
        </div>
      )})}
    </div>
  </div>
);

export const PopularDestinations = ({ onExplore }: { onExplore: (city: string) => void }) => (
  <div className="py-12 border-t border-slate-200">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Star className="h-6 w-6 text-yellow-500" />
        Điểm đến hàng đầu
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { name: 'Đà Nẵng', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=500&q=60' },
        { name: 'Hội An', img: 'https://images.unsplash.com/photo-1545638531-9f93310023a9?auto=format&fit=crop&w=500&q=60' },
        { name: 'Đà Lạt', img: 'https://images.unsplash.com/photo-1553503977-6f9473855e92?auto=format&fit=crop&w=500&q=60' },
        { name: 'Phú Quốc', img: 'https://images.unsplash.com/photo-1540202404-a6f646352c40?auto=format&fit=crop&w=500&q=60' }
      ].map((dest, i) => (
        <div 
          key={i} 
          className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
          onClick={() => onExplore(dest.name)}
        >
          <img 
            src={dest.img} 
            alt={dest.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4">
              <span className="text-white font-bold text-xl">{dest.name}</span>
              <div className="flex items-center gap-1 text-white/80 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                <span>Khám phá ngay</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
