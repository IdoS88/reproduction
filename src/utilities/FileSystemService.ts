
interface IFileSystemService {
    uploadFile: (oldPath : string, newPath : string) => Promise<boolean>,
}

class FileSystemService implements IFileSystemService {
    async uploadFile(oldPath: string, newPath: string) {
        return true;
    };
}