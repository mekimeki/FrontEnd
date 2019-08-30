import axios from 'axios';//axios
import router from '../router';//router

export default class Service {
  constructor(domain){
    this.domain = domain;//back-end URL address
    this.form = new FormData();
  }
  service_post(url,form){
    return axios.post(url,form)
    .then(res=>res.data)
    .catch(res=>{
      console.log("service err");
      // router.push({name:'main'});
      // alert("service err");
    });
  }
  service_post_up(url,form,config){//update post
    return axios.post(url,form,config)
    .then(res=>res.data)
    .catch(res=>{
      console.log("service err");
      // router.push({name:'upload'})
      // alert("service err");
    });
  }
  service_get(url, form){
    return axios.get(url)
    .then(res=>res.data)
    .catch(res=>{
      console.log("service err");
      // router.push({name:'main'});
      // alert("service err");
    });
  }
  login(request,data){
    this.form.append("email",data.email);
    this.form.append("password",data.password);
    return this.service_post(this.domain+request,this.form);
  }
  login_check(request,data){
    this.form.append("token",data);
    return this.service_post(this.domain+request,this.form);
  }
  capture_image(request,data){
    return 'imageNum';
    //capture image
  }
  csrf_check(request){
    return this.service_get(this.domain+request);
  }
  upload(request,data,_token,token,video_pk,config){
    if(video_pk){
      this.form.append("subtitle",data);//file data
      this.form.append("video_pk",video_pk);
    }else{
      this.form.append("video",data);//file data
    }
    this.form.append("_token",_token);//csrf token
    this.form.append("token",token);//jwt token
    return this.service_post_up(this.domain+request,this.form,config);
  }
  video_cut_upload(request,data,config){
    this.form.append('video_pk',data.video_pk);
    this.form.append('firstTime',parseInt(data.firstTime));
    this.form.append('lastTime',parseInt(data.lastTime));
    return this.service_post_up(this.domain+request,this.form,config);
  }
  subtitle_upload(request,data,config){
    console.log('subtitle upload',data);
    this.form.append("data",JSON.stringify(data.content));
    this.form.append("video_pk",data.video);
    return this.service_post_up(this.domain+request,this.form,config);
  }
  content_upload(request,data,config){
    this.form.append('video_pk',data.video);
    this.form.append("content",JSON.stringify(data.content));
    this.form.append('word',JSON.stringify(data.word));
    return this.service_post_up(this.domain+request,this.form,config);
  }
  upload_created(request,data,config){
    this.form.append('video_pk',data.video_pk)
    this.form.append('title',data.text.title);
    this.form.append('explain',data.text.explain);
    return this.service_post_up(this.domain+request,this.form,config);
  }
  quiz_quest(request,data){
    this.form.append('ran_box[]',data);
    console.log("quiz one success",this.form);
    return this.service_post(this.domain+request,this.form);
  }
  quiz_two_quest(request,data){
    this.form.append('ran_box[]',data);
    console.log("quiz three success",this.form);
    return this.service_get(this.domain+request,this.form);
  }
  quiz_three_quest(request,data){
    this.form.append('ran_box[]',data);
    console.log("quiz three success",this.form);
    return this.service_get(this.domain+request,this.form);
  }
  token_(request){
    return this.service_get(this.domain+request);
  }
  quiz_post(request,data){
    this.form.append('score',data[0]);
    this.form.append('id', data[1]);
    console.log(this.form);
    return this.service_post(this.domain+request,this.form);
  }
  word_delete_post(request,data){
    this.form.append('selected', data);
    console.log("delete post ok");
    return this.service_post(this.domain+request,this.form);
  }
  word_crawl_post(request,data){
    this.form.append("clickWord", data);
    console.log("crwaling post ok");
    return this.service_post(this.domain+request,this.form);
  }
  call_album_post(request,data){
    this.form.append("title",data[0]);
    this.form.append("lang", data[1]);
    this.form.append("words", data[2]);
    console.log("album post ok");
    return this.service_post(this.domain+request,this.form);
  }
  all_word_quest(request,data){
    return this.service_get(this.domain+request);
  }
  update_word_post(request,data){
    this.form.append("id",data[0]);
    this.form.append("flag",data[1]);
    return this.service_post(this.domain+request,this.form);
  }
  classify_word_quest(request,data){
    this.form.append("classifyWord",data);
    return this.service_get(this.domain+request,this.form)
  }
  select_word_quest(request,data){
    return this.service_get(this.domain+request)
  // word_delete_post(request,data,token){
  //   this.form.append('results', data);
  //   this.form.append('_token',token);
  //   console.log("요청준비중입니다")
  //   return this.service_post(this.domain+request,this.form);
  }
  share_content(request,data){
    console.log('service',data);
    this.form.append('voca',data.title);
    this.form.append('explain',data.content);
    this.form.append('time',data.time);
    this.form.append('video_pk',data.pk);
    return this.service_post(this.domain+request,this.form);
  }
  share_cocntent_update(request,data){
    this.form.append('title',data.voca);
    this.form.append('video_pk',data.video_pk);
    this.form.append('explain',data.explain);
    this.form.append('time',data.time);
    this.form.append('vo_pk',data.vo_pk);
    return this.service_post(this.domain+request,this.form);
  }
  graph_origin(request,data){
    console.log("servcie",data);
    this.form.append('v_pk',data.video_pk);
    this.form.append('id',data.id);
    this.form.append('s_time',data.firstTime);
    this.form.append('e_time',data.lastTime);
    return this.service_post(this.domain+request,this.form);
  }
  graph_record(request,data){
    console.log('service',data);
    this.form.append('audio',data.audio);
    this.form.append('originText',data.originText);
    this.form.append('originDuration',data.originDuration);
    this.form.append('id',data.id);
    this.form.append('title',data.title);
    return this.service_post(this.domain+request,this.form);
  }
  point(request,token){
    this.form.append('token',token);
    return this.service_post(this.domain+request,this.form);
  }
  point_save(request,token){
    return this.service_get(this.domain+request);
  }
}
