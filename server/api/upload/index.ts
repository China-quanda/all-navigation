import { bookmarksToJson, buildTree, flattenBookmarks, getBookmarkByType } from '~/server/utils/bookmarks'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  // console.log('formData:', formData);

  // 确保 formData 中包含 file 字段
  if (!formData.has('file')) {
    throw createError({ statusCode: 400, statusMessage: 'File is required' });
  }

  const file = formData.get('file') as File;

  if (file.type !== 'text/html') {
    throw createError({ statusCode: 400, statusMessage: 'File type is not text/html' });
  }

  // 将 File 转换为 ArrayBuffer 并解析为字符串
  const arrayBuffer = await file.arrayBuffer();
  const htmlContent = new TextDecoder('utf-8').decode(arrayBuffer);

  const result = bookmarksToJson(htmlContent);
  const flattenBookmark = flattenBookmarks(result.list);

  return {
    result,
    flattenBookmark,
    folder: getBookmarkByType(flattenBookmark, 'folder'),
    link: getBookmarkByType(flattenBookmark, 'link'),
    tree: buildTree(flattenBookmark)
  };
})
