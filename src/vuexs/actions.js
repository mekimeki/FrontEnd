import axios from 'axios';
import Service from '../api/service'

const service = new Service('http://172.26.3.96/');

const actions = {
  video_action: ({
    commit
  }, payload) => { //video element action
    commit('video_mutation', payload);
  },
  audio_action: ({
    commit
  }, payload) => { //audio action
    commit('audio_mutation', payload);
  },
  subtitle_preview_action: ({
    commit
  }, payload) => { //subtitle
    commit('subtitle_preview_mutation', payload);
  },
  content_action: ({
    commit
  }, payload) => { //content action
    commit('content_mutation', payload);
  },
  content_preview_content_action: ({
    commit
  }, payload) => {
    commit('content_preview_content_mutation', payload);
  },
  content_preview_word_action: ({
    commit
  }, payload) => {
    commit('content_preview_word_mutation', payload);
  },
  subtitle_action: ({
    commit
  }, payload) => { //subtitle action
    commit('subtitle_mutation', payload);
  },
  subtitle_buffer_action: ({
    commit
  }, payload) => { //subtitle create input subtitle buffer action
    commit('subtitle_buffer_mutation', payload);
  },
  seek_bar_action: ({
    commit
  }, payload) => { //video seek_bar actions
    commit('seek_bar_mutation', payload);
  },
  capture_action: ({
    commit
  }, payload) => { //capture element action
    commit('capture_mutation', payload);
  },
  capture_data_action: ({
    commit
  }, payload) => {
    commit('capture_data_mutation', payload);
  },
  bookmark_action: ({
    commit
  }, payload) => {
    commit('bookamrk_mutation', payload);
  },
  bookmark_image_action: ({
    commit
  }, payload) => {
    commit('bookmark_image_mutation', payload);
  },
  percent_action: ({
    commit
  }, payload) => { //capture element action
    commit('upload_percent_mutation', payload);
  },
  login_actions: ({
    commit
  }, payload) => { //login action
    service.login("api/login", payload).then(result => { //login axios
      if (result) { //yes token
        localStorage.setItem('login', result.token); //token save
        service.login_check("api/token", result.token).then(result => { //token check axios
          commit('login_mutation', result); //login values save to state
        });
      } else { // not token
        alert("ログイン失敗");
      }
    });
  },
  login_check_actions: ({
    commit
  }, payload) => { //login check action
    if (payload) { //localStorage check
      service.login_check("api/token", payload).then(result => { //login check axios
        if (result) {
          commit('login_mutation', result);
        } else {
          console.log("the error serious");
          console.log("not token vuex/actions.js->login_check_actions function check");
        }
      });
    }
  },
  logout_actions: ({
    commit
  }) => { //logout action
    let check = confirm("정말로 로그아웃 하시겠습니까?");
    if (check) { //yes
      commit('logout_mutation');
    } else { //no
      alert("logout취소");
    }
  },
  upload_action: ({
    commit
  }, payload) => {
    const config = {
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        commit('upload_percent_mutation', percentCompleted);
      }
    }
    if (payload.check) { //video
      service.csrf_check("csrf-token").then(result => {
        service.upload("api/video/originalUpload", payload.file, result, localStorage.getItem('login'), payload.video_pk, config)
          .then(result => {
            console.log('check_1', result);
            commit('upload_mutation', result);
          });
      });
    } else { //subtitle
      service.csrf_check("csrf-token").then(result => {
        service.upload("api/subtitle/originalUpload", payload.file, result, localStorage.getItem('login'), payload.video_pk, config)
          .then(result => {
            console.log('check_2', result);
            commit('upload_mutation', result);
          });
      });
    }
  },
  video_cut_actions: ({
    commit
  }, payload) => {
    const config = {
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        commit('upload_percent_mutation', percentCompleted);
      }
    }
    service.video_cut_upload('api/video/streamingUpload', payload, config).then(result => {
      console.log("cut 1", result);
      commit('video_cut_mutation', result);
    });
  },
  upload_subtitle_action: ({
    commit
  }, payload) => {
    const config = {
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        commit('upload_percent_mutation', percentCompleted);
      }
    }
    service.subtitle_upload("api/subtitle/produce", payload, config).then(result => {
      commit('upload_subtitle_mutations', result);
    });
  },
  upload_content_action: ({
    commit
  }, payload) => {
    const config = {
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        commit('upload_percent_mutation', percentCompleted);
      }
    }
    return service.content_upload('api/voca/add', payload, config).then(result => {
      commit('upload_content_mutations', result);
    });
  },
  share_content_action: ({
    commit
  }, payload) => {
    service.share_content('api/voca/insert', payload).then(result => {
      commit('share_content_mutation', payload);
    });
  },
  share_content_update_action: ({
    commit
  }, payload) => {
    return service.share_cocntent_update('api/voca/update', payload).then(result => {
      let data = {
        'vo_pk': result.vo_pk,
        'num': payload.num,
      }
      commit('share_content_update_mutation', data);
    });
  },
  graph_origin_action: ({
    commit
  }, payload) => {
    return service.graph_origin('api/voice/extraction', payload).then(result => {
      console.log("check", result);
      commit('graph_origin_mutations', result);
    });
  },
  graph_record_action: ({
    commit
  }, payload) => {
    return service.graph_record('api/voice/record', payload).then(result => {
      console.log("check_2", result);
      commit('graph_record_mutations', result);
    });
  },
  graph_reset_action: ({
    commit
  }, payload) => {
    commit('graph_reset_mutation', payload);
  },
  subtitle_record_action: ({
    commit
  }, payload) => { //in then components Subtitle
    commit('subtitle_record_mutation', payload);
  },
  //quiz actions
  quest_actions: ({
    commit
  }, payload) => {
    return service.quiz_quest('api/quiz', payload);
  },
  quest_post_actions: ({
    commit
  }, payload) => {
    return service.quiz_post('api/insertResult', payload);
  },
  //actions of quiz two
  quest_wrong_actions: ({
    commit
  }, payload) => {
    return service.quiz_two_quest('api/wrong', payload);
  },

  //actions of quiz three
  quiz_three_quest_actions: ({
    commit
  }, payload) => {
    return service.quiz_three_quest('api/sentence', payload);
  },

  //word delete actions
  word_delete_actions: ({
    commit
  }, payload) => {
    return service.word_delete_post('api/deletedWord', payload);
  },
  //word crawl actions
  word_crawl_actions: ({
    commit
  }, payload) => {
    return service.word_crawl_post('api/example', payload);
  },
  //call album actions
  call_album_actions: ({
    commit
  }, payload) => {
    console.log(payload);
    return service.call_album_post('api/create', payload);
  },
  //all word actions
  all_word_actions: ({
    commint
  }, payload) => {
    if (payload == 0) {
      return service.all_word_quest('api/book/0', payload);
    } else if (payload == 1) {
      return service.all_word_quest('api/memo/T', payload);
    } else {
      return service.all_word_quest('api/memo/F', payload);
    }
  },
  //classify word actions
  classify_word_actions: ({
    commit
  }, payload) => {
    return service.classify_word_quest('api/book/0', payload);
  },
  //selected word quest
  select_word_actions: ({
    commit
  }, payload) => {
    return service.select_word_quest('api/book/' + payload, payload)
  },
  //update word actions
  update_word_actions: ({
    commit
  }, payload) => {
    return service.update_word_post('api/update', payload);
  },
  upload_created_action: ({
    commit
  }, payload) => {
    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        commit('upload_percent_mutation', percentCompleted);
      }
    }
    return service.upload_created('api/video/enrollment', payload, config);
  },
  point_action: ({
    commit
  }, payload) => {
    service.point('api/member/upPoint', localStorage.getItem('login')).then(result => {
      service.point_save('api/member/getPoint', localStorage.getItem('login')).then(result => {
        commit('point_mutation', result[0].point);
      });
    });
  },
  point_save_action: ({
    commit
  }, payload) => {
    service.point_save('api/member/getPoint', localStorage.getItem('login')).then(result => {
      console.log("???");
      commit('point_mutation', result[0].point);
    });
  },
  open_quiz_action: ({
    commit
  }, payload) => {
    commit('open_quiz_mutation', payload);
  },
  open_record_action: ({
    commit
  }, payload) => {
    commit('open_record_mutation', payload);
  }
}
export default actions;
