import { Injectable, ReflectiveInjector, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app.config';
import { Post, PostsResponse } from '../app/posts/post';

const config: AppConfig = new AppConfig();


/**
 * This class provides the Post API service with methods to list, create, update and delete APIs.
 */
@Injectable()
export class PostService {

  http: HttpClient;

  /**
   * Creates a new PostService.
   * HttpClient is being injected manually.
   * @constructor
   */
  constructor() {
    let injector = ReflectiveInjector.resolveAndCreate(this.getAnnotations(HttpClientModule)[0].providers);
    
    this.http = injector.get(HttpClient);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Observable<any>} The Observable for the HTTP request.
   */
  getPosts(): Observable<PostsResponse> {
    let url = config.apiBaseUrl;
    console.log("GET", url);
    return this.http.get<PostsResponse>(url);
  }

  // declare let Reflect: any;
  private getAnnotations(typeOrFunc: Type<any>): any[]|null {
    // Prefer the direct API.
    if ((<any>typeOrFunc).annotations) {
      let annotations = (<any>typeOrFunc).annotations;
      if (typeof annotations === 'function' && annotations.annotations) {
        annotations = annotations.annotations;
      }
      return annotations;
    }
  
    // API of tsickle for lowering decorators to properties on the class.
    if ((<any>typeOrFunc).decorators) {
      return this.convertTsickleDecoratorIntoMetadata((<any>typeOrFunc).decorators);
    }
  
    // API for metadata created by invoking the decorators.
    if (Reflect && Reflect.getOwnMetadata) {
      return Reflect.getOwnMetadata('annotations', typeOrFunc);
    }
    return null;
  }
  
  convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
    if (!decoratorInvocations) {
      return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
      const decoratorType = decoratorInvocation.type;
      const annotationCls = decoratorType.annotationCls;
      const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
      return new annotationCls(...annotationArgs);
    });
  }
}

