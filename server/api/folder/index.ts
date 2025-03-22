import { prisma } from "~/prisma"
export default defineEventHandler(async (event) => {
  // console.log('event',event)
  const body = await readBody(event);
  // await prisma.folder.create({
  //   data: {
  //     name: body.name,
  //     parentId: body.parentId
  //   },
  // });

  // await prisma.folder.update(
  //   {
  //     where: {
  //       id: body.id,
  //     },
  //     data: {
  //       name: body.name,
  //       parentId: body.parentId
  //     },
  //   }
  // )

  // const folders2 = await prisma.folder.findMany({
  //   include: {
  //     children: true,
  //   },
  // })

  // await prisma.folder.delete({
  //   where: {
  //     id: body.id,
  //   },
  // })

  const foldersData = [{
    "id": 9,
    "createTime": "2025-03-21T02:00:32.308Z",
    "updatedTime": "2025-03-21T02:00:32.308Z",
    "name": "后端",
    "icon": null,
    "sortOrder": 0,
    "isPublic": true,
    "password": null,
    "parentId": null,
    "children": [
      {
        "id": 10,
        "createTime": "2025-03-21T02:00:37.317Z",
        "updatedTime": "2025-03-21T02:10:26.733Z",
        "name": "框架",
        "icon": null,
        "sortOrder": 0,
        "isPublic": true,
        "password": null,
        "parentId": 9,
        "children": []
      },
      {
        "id": 11,
        "createTime": "2025-03-21T02:00:46.395Z",
        "updatedTime": "2025-03-21T02:10:30.448Z",
        "name": "orm",
        "icon": null,
        "sortOrder": 0,
        "isPublic": true,
        "password": null,
        "parentId": 9,
        "children": []
      },
      {
        "id": 12,
        "createTime": "2025-03-21T02:00:55.491Z",
        "updatedTime": "2025-03-21T02:10:39.158Z",
        "name": "插件",
        "icon": null,
        "sortOrder": 0,
        "isPublic": true,
        "password": null,
        "parentId": 9,
        "children": []
      },
      {
        "id": 13,
        "createTime": "2025-03-21T02:01:10.091Z",
        "updatedTime": "2025-03-21T02:10:48.190Z",
        "name": "数据库设计",
        "icon": null,
        "sortOrder": 0,
        "isPublic": true,
        "password": null,
        "parentId": 9,
        "children": [
          {
            "id": 14,
            "createTime": "2025-03-21T02:01:17.890Z",
            "updatedTime": "2025-03-21T02:11:05.777Z",
            "name": "mysql设计",
            "icon": null,
            "sortOrder": 0,
            "isPublic": true,
            "password": null,
            "parentId": 13,
            "children": []
          },
          {
            "id": 15,
            "createTime": "2025-03-21T02:12:43.204Z",
            "updatedTime": "2025-03-21T02:20:53.159Z",
            "name": "pgsql设计",
            "icon": null,
            "sortOrder": 0,
            "isPublic": true,
            "password": null,
            "parentId": 13,
            "children": [
              {
                "id": 16,
                "createTime": "2025-03-21T02:21:42.007Z",
                "updatedTime": "2025-03-21T02:21:42.007Z",
                "name": "pgsql设计_01",
                "icon": null,
                "sortOrder": 0,
                "isPublic": true,
                "password": null,
                "parentId": 15,
                "children": [
                  {
                    "id": 18,
                    "createTime": "2025-03-21T02:22:15.224Z",
                    "updatedTime": "2025-03-21T02:22:15.224Z",
                    "name": "pgsql设计_01_01",
                    "icon": null,
                    "sortOrder": 0,
                    "isPublic": true,
                    "password": null,
                    "parentId": 16,
                    "children": [
                      {
                        "id": 19,
                        "createTime": "2025-03-21T02:43:28.808Z",
                        "updatedTime": "2025-03-21T02:43:28.808Z",
                        "name": "pgsql设计_01_01_01",
                        "icon": null,
                        "sortOrder": 0,
                        "isPublic": true,
                        "password": null,
                        "parentId": 18
                      }
                    ]
                  }
                ]
              },
              {
                "id": 17,
                "createTime": "2025-03-21T02:21:50.918Z",
                "updatedTime": "2025-03-21T02:21:50.918Z",
                "name": "pgsql设计_02",
                "icon": null,
                "sortOrder": 0,
                "isPublic": true,
                "password": null,
                "parentId": 15,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }]

  /**
   * 递归创建文件夹
   * @param folders 文件夹数组
   * @param parentId 父文件夹ID
   * @returns 所有创建的文件夹
   * */
  async function createFoldersRecursively(folders: any[], parentId: number | null = null): Promise<any> {
    const createdFolders: any[] = []; // 用于存储创建的文件夹

    for (const folder of folders) {
      const createdFolder = await prisma.folder.create({
        data: {
          name: folder.name,
          parentId: parentId,
        },
      });

      createdFolders.push(createdFolder); // 将创建的文件夹添加到结果数组中

      if (folder.children && folder.children.length > 0) {
        const childFolders = await createFoldersRecursively(folder.children, createdFolder.id);
        createdFolders.push(...childFolders); // 将子文件夹的结果合并到主数组中
      }
    }

    return createdFolders; // 返回所有创建的文件夹
  }

  // try {
  //   await createFoldersRecursively(foldersData);
  //   console.log('Folders created successfully');
  // } catch (error) {
  //   console.error('Error creating folders:', error);
  // } finally {
  //   await prisma.$disconnect();
  // }

  const folders2 = await prisma.folder.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: {
            include: {
              children: {
                include: {
                  children: {
                    include: {
                      children: true // 递归地包含子类别
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  async function getFolders(folderId: number) {
    const node = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: {
                      include: {
                        children: true // 递归地包含子类别
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    return node;
  }


  // console.log('folders2',folders2)
  return {
    folders2,
    // menus: await getFolders(9)
  }
})
