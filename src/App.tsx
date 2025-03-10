import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Post } from './type/post';
import usePostStore from './hook/use-post-store';
import { ToastContainer, toast } from 'react-toastify';
import {
  Backdrop,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LABEL } from './constants/label';
import Grid from '@mui/material/Grid2';

const App: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = usePostStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ isDelete: boolean; id?: number }>({
    isDelete: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(editingPost.id, title, content);
      toast.info(LABEL.noti.update_success);
      setEditingPost(null);
    } else {
      addPost(title, content);
      toast.success(LABEL.noti.create_success);
    }
    setTitle('');
    setContent('');
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  return (
    <Container sx={{ backgroundColor: '#f5f7fa' }} maxWidth="lg">
      <Typography
        component="h1"
        variant="h1"
        textAlign="center"
        mb={4}
        mt={2}
        sx={{ fontWeight: 700, fontSize: 50, color: '#2c3e50' }}
      >
        {LABEL.bulletin_board}
      </Typography>

      <ToastContainer position="top-right" autoClose={1800} />

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, md: 5.8 }}>
          <form onSubmit={handleSubmit}>
            <Card sx={{ p: 4, py: 3, borderRadius: 2 }}>
              <Stack gap={2}>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: '#2c3e50', fontSize: 20 }}>
                    {editingPost ? LABEL.update_title : LABEL.create_title}
                  </Typography>
                  <Divider sx={{ mt: 1, borderWidth: 1 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: '#2c3e50', fontSize: 16, mb: 0.5 }}>
                    {LABEL.title_form} *
                  </Typography>
                  <TextField
                    size="small"
                    placeholder={LABEL.placeholder.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: '#2c3e50', fontSize: 16, mb: 0.5 }}>
                    {LABEL.desc_form} *
                  </Typography>
                  <TextField
                    size="small"
                    placeholder={LABEL.placeholder.desc}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={5}
                    required
                  />
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" fullWidth type="submit" sx={{ borderRadius: '6px' }}>
                    {editingPost ? LABEL.button_label.update : LABEL.button_label.create}
                  </Button>
                  {editingPost && (
                    <Button
                      onClick={() => {
                        setEditingPost(null);
                        setTitle('');
                        setContent('');
                      }}
                      sx={{ borderRadius: '6px' }}
                      variant="contained"
                      color="inherit"
                      fullWidth
                    >
                      {LABEL.button_label.cancel}
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Card>
          </form>
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: 'none', md: 'block' },
            borderWidth: 1.5,
            borderColor: '#86a8e7',
          }}
        />

        <Grid size={{ xs: 12, md: 5.8 }}>
          <Stack gap={2}>
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#2c3e50', fontSize: 20 }}>
                {LABEL.bulletin_list}
              </Typography>
              <Divider sx={{ mt: 1, borderWidth: 1 }} />
            </Box>
            {posts.length === 0 && (
              <Typography sx={{ fontWeight: 400, color: 'gray', fontSize: 16 }}>
                {LABEL.no_bulletin}
              </Typography>
            )}
            <Stack>
              {posts.map((post) => (
                <Card
                  sx={{
                    p: 2,
                    py: 1.5,
                    borderRadius: 2,
                    ':hover':
                      editingPost?.id !== post.id
                        ? {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          }
                        : {},
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    mb: '12px',
                  }}
                  key={post.id}
                >
                  <Typography sx={{ fontWeight: 700, color: '#2c3e50', fontSize: 18 }}>
                    {post.title}
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: 20 }}>{post.content}</Typography>
                  <Stack direction="row" justifyContent="flex-end" mt={1} spacing={1}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleEdit(post)}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '6px',
                        backgroundColor: '#f0ad4e',
                      }}
                      disabled={editingPost?.id === post.id}
                    >
                      {LABEL.button_label.edit}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setConfirmDelete({ isDelete: true, id: post.id })}
                      sx={{ textTransform: 'none', borderRadius: '6px' }}
                      disabled={editingPost?.id === post.id}
                    >
                      {LABEL.button_label.delete}
                    </Button>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Modal
        open={confirmDelete.isDelete}
        onClose={() => setConfirmDelete({ isDelete: false })}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={confirmDelete.isDelete}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '6px',
              boxShadow: 24,
              p: 2.5,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              textAlign="center"
              fontWeight={600}
              color="error"
              textTransform={'uppercase'}
            >
              {LABEL.delete_modal.title}
            </Typography>
            <Typography textAlign="center" sx={{ mt: 1 }}>
              {LABEL.delete_modal.confirm_message}
            </Typography>
            <Typography textAlign="center" sx={{ mt: 1 }}>
              {LABEL.delete_modal.cannot_restore}
            </Typography>
            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deletePost(confirmDelete?.id || 0);
                  setConfirmDelete({ isDelete: false });
                  toast.error(LABEL.noti.delete_success);
                }}
                sx={{ textTransform: 'none', borderRadius: '6px' }}
              >
                {LABEL.button_label.yes}
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => setConfirmDelete({ isDelete: false })}
                sx={{ textTransform: 'none', borderRadius: '6px' }}
              >
                {LABEL.button_label.no}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default App;
