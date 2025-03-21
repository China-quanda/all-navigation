import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
// import url from 'url';
// import fs from 'fs';

const outputDir = './output/json'

function saveFile(filePath: string, data?: any) {

  // 获取文件目录路径
  const dirPath = path.dirname(filePath);

  // 确保目录存在
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // 使用{ recursive: true }可以创建多级目录
    console.log(`Directory ${dirPath} created.`);
  } else {
    console.log(`Directory ${dirPath} already exists.`);
  }

  // 确保文件存在
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data || '', 'utf-8');
    console.log(`File ${filePath} created.`);
  } else {
    fs.writeFileSync(filePath, data || '', 'utf-8');
    console.log(`File ${filePath} already exists.`);
  }
}

/**
 * 将HTML内容转换为JSON格式
 * @param html 输入的HTML字符串
 * @requires any  返回包含书签信息的JSON对象
 */
export const bookmarksToJson = (html: string) => {

  // 使用cheerio加载HTML内容
  const $ = cheerio.load(html);

  // 获取HTML文档的<title>标签文本作为书签标题
  const bookmarkTitle = $('title').text() || 'bookmarkTitle';

  // 初始化书签列表
  const list: any[] = [];

  // 获取最外层的<dl>标签
  const $dl = $("dl").first();

  // 遍历<dl>标签下的每个<dt>标签
  $dl.children("dt").each(function () {
    const $dt = $(this);
    // 从<dt>标签开始遍历DOM树，生成书签对象
    const obj = foo($dt);
    list.push(obj);
  });

  // 打印生成书签成功的信息
  console.log("bookmarksToJson generated successfully")

  saveFile(`${outputDir}/output.json`, JSON.stringify({name:bookmarkTitle,list}, null, 2))

  // 返回包含书签标题和书签列表的JSON对象
  return {
    name: bookmarkTitle,
    list: list
  }

  /**
   * 递归解析DOM树，生成书签对象
   * @param $dt - cheerio对象，表示当前<dt>标签
   * @returns 返回书签对象
   */
  function foo($dt: any, parentId?: string) {

    // 获取<dt>标签下的<h3>标签（表示文件夹名称）
    const $h3 = $dt.children("h3");

    // 如果没有<h3>标签，则表示这是一个链接
    if ($h3.length == 0) {
      // 获取<dt>标签下的<a>标签（表示链接）
      const $a = $dt.children("a");

      // 返回链接的名称、URL、图标、创建时间组成的对象
      return $a.length > 0 ? {
        id: uuid(),
        parentId: parentId,
        type: "link",
        title: $a.text(),
        url: $a.attr('href'),
        icon: getIcon($a.attr('href'), $a.attr('icon')),
        createTime: $a.attr('add_date') || "",
      } : null;
    }

    // 初始化子书签列表
    const children = [];
    let obj = {};
    const objId = uuid()


    // 获取<dt>标签下的<dl>标签（包含子书签）
    const $dl = $dt.children("dl");
    const $dtArr = $dl.children("dt");

    // 遍历子<dt>标签
    for (let i = 0; i < $dtArr.length; i++) {
      // 递归解析子<dt>标签，生成子书签对象
      const tmp = foo($dtArr.eq(i), objId);
      // 将子书签对象添加到子书签列表中
      children.push(tmp);
    }

    // 创建文件夹对象，包含文件夹名称、创建时间、更新时间和子书签列表
    obj = {
      id: objId,
      parentId: parentId || null,
      type: "folder",
      title: $h3.text(),
      createTime: $h3.attr('add_date') || "",
      updatedTime: $h3.attr('last_modified') || "",
      children: children
    }

    // 返回文件夹对象
    return obj;
  }

  /**
   * 获取书签的图标URL
   * @param url - 书签的URL
   * @param icon - 书签的图标URL（可选）
   * @returns 返回图标URL
   */
  function getIcon(url: string, icon: string) {
    let iconUrl = icon || '';

    // 如果没有提供图标URL且没有URL，则返回空字符串
    if (!icon && !url) return ''

    // 如果没有提供图标URL，则尝试从URL中生成默认的favicon.ico URL
    if (!iconUrl) {
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
          return iconUrl = `${parsedUrl.origin}/favicon.ico`
        } else {
          console.error('无效的 URL 协议:', parsedUrl.protocol);
        }
      } catch (error) {
        console.error('error 无效的 URL:', error);
      }
    }

    // 返回图标URL
    return iconUrl
  }
}


/**
 * 书签接口定义
 */
interface Bookmark {
  id: string;
  type: string;
  title: string;
  createTime?: string;
  updatedTime?: string;
  url?: string;
  icon?: string;
  parentId?: string | null;
  children?: Bookmark[];
}

/**
 * 用于将嵌套的书签结构（树形结构）展平为一个扁平的数组
 * @param bookmarks 输入的嵌套书签数组。
 * @param parentId 可选参数，表示当前书签的父节点 ID。
 * @returns 返回一个扁平化的书签数组。
 * @description 该函数的主要功能是将树形结构的书签数据转换为扁平化的一维数组，并为每个书签生成唯一的 id 和 parentId 属性。
 */
export function flattenBookmarks(bookmarks: Bookmark[], parentId?: string): Bookmark[] {

  // 定义一个空数组 flatBookmarks，用于存储扁平化后的书签
  let flatBookmarks: Bookmark[] = [];

  // 遍历输入的书签数组
  bookmarks.forEach(bookmark => {
    // 创建一个新的书签对象，包含原始书签的所有属性、唯一ID和父节点ID
    const newBookmark: Bookmark = {
      ...bookmark,
      // 不需要生成id和parentId 了 ，因为在 bookmarksToJson 中已经生成了
      // id: uuid(), 
      // parentId: parentId || null
    };

    // 将新书签对象添加到 flatBookmarks 数组中
    flatBookmarks.push(newBookmark);

    // 如果新书签有子节点，则递归调用 flattenBookmarks 处理子节点
    if (newBookmark.children && newBookmark.children.length > 0) {
      flatBookmarks = flatBookmarks.concat(flattenBookmarks(newBookmark.children, newBookmark.id));
      delete newBookmark.children; // 删除子节点属性，确保最终输出的书签对象中不包含嵌套的子节点
    }
  });

  saveFile(`${outputDir}/output_flattened.json`, JSON.stringify(flatBookmarks, null, 2))

  // 返回扁平化后的书签数组
  return flatBookmarks;
}

/**
 * 根据类型过滤书签列表
 * @param list - 输入的书签数组
 * @param type - 过滤的书签类型（默认为'folder'）
 * @returns 返回过滤后的书签数组
 */
export const getBookmarkByType = (list: Bookmark[], type: 'folder' | 'link' = 'folder') => {
  let newArr: Bookmark[] = [];

  // 遍历输入的书签数组
  list.forEach(item => {
    // 如果书签类型匹配，则将其添加到新数组中
    if (item.type === type) {
      newArr.push(item)
    }
  })
  saveFile(`${outputDir}/${type}.json`, JSON.stringify(newArr, null, 2))
  // 返回过滤后的书签数组
  return newArr
}

/**
 * 将扁平化的书签列表转换为树形结构
 * @param list 要转化的列表
 * @returns 
 */
export const buildTree = (list: Bookmark[]) => {
  const map = {};
  const roots: any[] = [];

  // 创建一个映射，方便查找
  list.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // 构建树形结构
  list.forEach(item => {
    if (item.parentId === null) {
      roots.push(map[item.id]);
    } else {
      if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      }
    }
  });
  
  saveFile(`${outputDir}/buildTree.json`, JSON.stringify(roots, null, 2))

  return roots;
}


/**
 * Bookmarks to JSON 源代码
 * const cheerio = require('cheerio'),
  fs = require('fs'),
  url = require('url');

const fileName = './bookmarks.html';
const outputName = './output.json'

// 读取书签html文件
fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    parse(data);
  }
});

function parse(html) {

  // 加载html，使用常用的$符号
  const $ = cheerio.load(html);

  const bookmarkTitle = $('title').text() || 'bookmarkTitle';

  const list = [];
  // 获取最外层的dt标签
  const $dl = $("dl").first();
  $dl.children("dt").each(function () {
    const $dt = $(this);
    // 从dt开始遍历dom树，生成对象
    const obj = foo($dt);
    list.push(obj);
  });

  downloadIcons(list)

  // 将json字符串写入json文件
  fs.writeFileSync(outputName, JSON.stringify({
    name: bookmarkTitle,
    list: list
  }, null, 4));

  function foo($dt) {
    // h3标签为文件夹名称
    const $h3 = $dt.children("h3");
    if ($h3.length == 0) {
      // a标签为网址
      const $a = $dt.children("a");
      // 返回该书签的名称和网址组成的对象
      return $a.length > 0 ? {
        type: "link",
        title: $a.text(),
        url: $a.attr('href'),
        icon: getIcon($a.attr('href'), $a.attr('icon')),
        createTime: $a.attr('add_date') || "",
      } : null;
    }

    const children = [];
    let obj = {};

    // 获取下一级dt标签集合
    const $dl = $dt.children("dl");
    const $dtArr = $dl.children("dt");
    for (let i = 0; i < $dtArr.length; i++) {
      // 遍历下一级dt标签
      const tmp = foo($dtArr.eq(i));
      // 将返回的对象push至子文件数组
      children.push(tmp);
    }
    // 创建文件夹与子文件数组的键值对
    obj = {
      type: "folder",
      title: $h3.text(),
      createTime: $h3.attr('add_date') || "",
      updatedTime: $h3.attr('last_modified') || "",
      children: children
    }
    // 返回该对象
    return obj;
  }
}


function downloadIcons(bookmarks) {
  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];
    if (bookmark.type === 'folder') {
      downloadIcons(bookmark.children);
    } else if (bookmark.type === 'link') {
      downloadIcon(bookmark);
    }
  }

  function downloadIcon(bookmark) {
    // console.log( "downloadIcon",bookmark.title)
  }

  // console.log( "downloadIcons",bookmarks)
}


function getIcon(url, icon) {
  let iconUrl = icon || '';
  if (!icon && !url) return ''
  if (!iconUrl) {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return iconUrl = `${parsedUrl.origin}/favicon.ico`
      } else {
        console.error('无效的 URL 协议:', parsedUrl.protocol);
      }
    } catch (error) {
      console.error('error 无效的 URL:', error);
    }
  }
  return iconUrl
}
 */

/**
// 用于将嵌套的书签结构（树形结构）展平为一个扁平的数组
export const fBookmarks = ()=>{

  // 从本地获取json数据
  const filePath = path.resolve('/Users/quanda/Desktop/navigation_project/all-navigation/output.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  // console.log('rawData',rawData)
  const data = JSON.parse(rawData);
  // console.log('data',data)

  const flatData = flattenBookmarks(data.data);
  console.log('flatData',flatData)

  // Output the flattened data to a new JSON file
  // 转换后的写入本地
  fs.writeFileSync(path.resolve('/Users/quanda/Desktop/navigation_project/all-navigation/output_flattened.json'), JSON.stringify(flatData, null, 2));
}
 */